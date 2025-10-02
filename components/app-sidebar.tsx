"use client";

import * as React from "react";
import Link from "next/link";
import { X, Settings, ChevronDown, Table2, Sun, Moon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiSendPlaneLine, RiChatSmile3Line, RiRobot2Line, RiArrowDownLine } from "@remixicon/react";
import { groqService, GROQ_MODELS, type ChatMessage } from "@/services/groq-service";
import { generateLocationSystemPrompt, availableLocations } from "@/services/location-data-service";
import { useTheme } from "@/contexts/theme-context";

// Utility function to format timestamps consistently
const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  isStreaming?: boolean;
}

// Initial welcome message (will be replaced with location-specific data)
const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm SCC (Smart City Copilot), your AI assistant by Team ChocoLava. I'm here to help with emergency services and smart city management. How can I assist you today?",
    sender: "bot",
    timestamp: formatTimestamp(new Date()),
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  selectedLocation?: string;
}

export function AppSidebar({ selectedLocation = "Madhya Marg", ...props }: AppSidebarProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState("llama-3.3-70b-versatile");
  const [isLoading, setIsLoading] = React.useState(false);
  const [tablePopup, setTablePopup] = React.useState<{ isOpen: boolean; content: string; messageId: number | null }>({ isOpen: false, content: '', messageId: null });
  const [currentLocation, setCurrentLocation] = React.useState(selectedLocation);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [newMessageCount, setNewMessageCount] = React.useState(0);
  const lastMessageRef = React.useRef<HTMLDivElement>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { setOpen } = useSidebar();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleClose = React.useCallback(() => {
    // Multiple methods to ensure sidebar closes on mobile
    setOpen(false);
    
    // Force close if the context method doesn't work
    const sidebarElement = document.querySelector('[data-sidebar="sidebar"]');
    if (sidebarElement) {
      sidebarElement.setAttribute('data-state', 'closed');
    }
    
    // Trigger a small delay and try again if needed
    setTimeout(() => {
      setOpen(false);
    }, 50);
  }, [setOpen]);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    groqService.setModel(modelId);
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setShowScrollButton(false);
        setNewMessageCount(0);
        
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
        
        // Backup method using last message ref
        if (lastMessageRef.current) {
          setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }, 100);
        }
      }
    }
  };

  // Check if user has scrolled to bottom
  const checkScrollPosition = React.useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const scrollDiff = scrollHeight - (scrollTop + clientHeight);
        const isAtBottom = scrollDiff <= 5;
        
        if (isAtBottom) {
          setShowScrollButton(false);
          setNewMessageCount(0);
        }
      }
    }
  }, []);

  // Function to detect tables and return their positions
  const getTablePositions = (text: string): Array<{start: number, end: number, tableNumber: number}> => {
    const lines = text.split('\n');
    const tables: Array<{start: number, end: number, tableNumber: number}> = [];
    let currentTableStart = -1;
    let tableNumber = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.includes('|') && line.length > 1) {
        if (currentTableStart === -1) {
          currentTableStart = i;
        }
      } else if (currentTableStart !== -1 && line === '') {
        // Empty line might be part of table formatting
        continue;
      } else if (currentTableStart !== -1) {
        // End of current table
        tables.push({start: currentTableStart, end: i - 1, tableNumber: ++tableNumber});
        currentTableStart = -1;
      }
    }
    
    // Handle table that goes to end of text
    if (currentTableStart !== -1) {
      tables.push({start: currentTableStart, end: lines.length - 1, tableNumber: ++tableNumber});
    }
    
    return tables;
  };

  // Function to detect if message contains tables
  const hasTable = (text: string): boolean => {
    return getTablePositions(text).length > 0;
  };

  // Function to extract specific table content from markdown
  const extractTableContent = (text: string, tableIndex: number = 0): string => {
    const lines = text.split('\n');
    const tables = getTablePositions(text);
    
    if (tables.length === 0 || tableIndex >= tables.length) {
      return '';
    }
    
    const targetTable = tables[tableIndex];
    const tableLines: string[] = [];
    
    // Extract only the lines for the specific table
    for (let i = targetTable.start; i <= targetTable.end; i++) {
      const line = lines[i];
      if (line.trim().includes('|')) {
        tableLines.push(line);
      }
    }
    
    return tableLines.join('\n');
  };

  // Function to show specific table in popup
  const showTablePopup = (content: string, messageId: number, tableIndex: number = 0) => {
    const tableContent = extractTableContent(content, tableIndex);
    setTablePopup({ isOpen: true, content: tableContent, messageId });
  };

  // Function to close table popup
  const closeTablePopup = () => {
    setTablePopup({ isOpen: false, content: '', messageId: null });
  };

  // Function to render content with multiple table buttons
  const renderMessageWithTableButtons = (text: string, messageId: number) => {
    const tables = getTablePositions(text);
    if (tables.length === 0) {
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            p: ({ children }) => (
              <p className="break-words leading-relaxed text-foreground my-1 text-xs overflow-hidden">
                {children}
              </p>
            ),
            code: ({ children, ...props }: any) => {
              const inline = !props.className?.includes('language-');
              return inline ? (
                <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground break-all">
                  {children}
                </code>
              ) : (
                <div className="bg-muted/50 rounded-lg p-2 my-2 overflow-x-auto">
                  <code className="text-xs font-mono text-foreground block whitespace-pre-wrap break-all">
                    {children}
                  </code>
                </div>
              );
            },
            strong: ({ children }) => (
              <strong className="font-bold text-foreground">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-foreground">{children}</em>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside my-2 space-y-1 text-xs">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside my-2 space-y-1 text-xs">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="text-foreground text-xs">{children}</li>
            ),
            h1: ({ children }) => (
              <h1 className="text-sm font-bold my-2 text-foreground">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-sm font-semibold my-2 text-foreground">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xs font-semibold my-1 text-foreground">{children}</h3>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      );
    }

    // Split content by tables and render with buttons
    const lines = text.split('\n');
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    tables.forEach((table, tableIndex) => {
      // Add content before table
      if (table.start > lastIndex) {
        const beforeTableContent = lines.slice(lastIndex, table.start).join('\n');
        if (beforeTableContent.trim()) {
          parts.push(
            <ReactMarkdown key={`before-${tableIndex}`} remarkPlugins={[remarkGfm]} components={{
              p: ({ children }) => (
                <p className="break-words leading-relaxed text-foreground my-1 text-xs">{children}</p>
              ),
            }}>
              {beforeTableContent}
            </ReactMarkdown>
          );
        }
      }
      
      // Add table button
      parts.push(
        <div key={`table-${tableIndex}`} className="inline-flex items-center gap-2 my-2 p-2 bg-muted/30 rounded-lg">
          <span className="text-xs text-muted-foreground italic">
            [Table {tableIndex + 1}]
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => showTablePopup(text, messageId, tableIndex)}
            className="h-5 px-2 text-xs"
          >
            <Table2 className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      );
      
      lastIndex = table.end + 1;
    });
    
    // Add content after last table
    if (lastIndex < lines.length) {
      const afterTableContent = lines.slice(lastIndex).join('\n');
      if (afterTableContent.trim()) {
        parts.push(
          <ReactMarkdown key="after-last" remarkPlugins={[remarkGfm]} components={{
            p: ({ children }) => (
              <p className="break-words leading-relaxed text-foreground my-1 text-xs">{children}</p>
            ),
          }}>
            {afterTableContent}
          </ReactMarkdown>
        );
      }
    }
    
    return <div>{parts}</div>;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: formatTimestamp(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage("");
    setIsLoading(true);

    try {
      // Create a streaming bot message
      const botMessageId = Date.now() + 1;
      const botMessage: Message = {
        id: botMessageId,
        text: "",
        sender: "bot",
        timestamp: formatTimestamp(new Date()),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Prepare conversation history for the AI with location-specific data
      const chatHistory: ChatMessage[] = [
        {
          role: "system",
          content: generateLocationSystemPrompt(currentLocation)
        },
        ...messages.slice(-10).map((msg): ChatMessage => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        })),
        {
          role: "user",
          content: currentMessage
        }
      ];

      // Stream the response
      let fullResponse = "";
      const stream = groqService.getChatStream(chatHistory);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId 
              ? { ...msg, text: fullResponse, isStreaming: true }
              : msg
          )
        );
      }

      // Mark streaming as complete
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { ...msg, isStreaming: false }
            : msg
        )
      );

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm SCC, and I encountered an error. Please make sure your Groq API key is set up correctly, or contact Team ChocoLava for support.",
        sender: "bot",
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Track previous message count for new message detection
  const prevMessageCountRef = React.useRef(messages.length);

  // Effect to handle new messages with auto-scroll
  React.useEffect(() => {
    const currentMessageCount = messages.length;
    const previousMessageCount = prevMessageCountRef.current;
    
    if (currentMessageCount > previousMessageCount) {
      const newMessagesAdded = currentMessageCount - previousMessageCount;
      
      setTimeout(() => {
        const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
          const scrollDiff = scrollHeight - (scrollTop + clientHeight);
          const isNearBottom = scrollDiff <= 100; // If user is within 100px of bottom, auto-scroll
          
          if (isNearBottom) {
            // Auto-scroll to bottom for new messages
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              behavior: 'smooth'
            });
          } else {
            // Show button if user scrolled far up
            setShowScrollButton(true);
            setNewMessageCount(prev => prev + newMessagesAdded);
          }
        } else {
          // Default to showing button if can't check scroll position
          setShowScrollButton(true);
          setNewMessageCount(prev => prev + newMessagesAdded);
        }
      }, 200); // Delay to ensure content is rendered
    }
    
    prevMessageCountRef.current = currentMessageCount;
  }, [messages.length]);

  // Add scroll listener for manual scrolling
  React.useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      const handleScroll = () => {
        // Check if user scrolled to bottom
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const scrollDiff = scrollHeight - (scrollTop + clientHeight);
        const isAtBottom = scrollDiff <= 30; // Reasonable threshold for manual scroll
        
        if (isAtBottom) {
          setShowScrollButton(false);
          setNewMessageCount(0);
        }
      };
      
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Initialize with location data and reset chat when location changes
  React.useEffect(() => {
    if (selectedLocation !== currentLocation) {
      // Create new welcome message with location-specific data
      const locationWelcomeMessage: Message = {
        id: Date.now(),
        text: `Hello! I'm SCC (Smart City Copilot), your AI assistant by Team ChocoLava. I've been updated with real-time data for **${selectedLocation}**. I can help you with emergency services, traffic management, and smart city solutions for this location. How can I assist you today?`,
        sender: "bot",
        timestamp: formatTimestamp(new Date()),
      };
      
      setMessages([locationWelcomeMessage]);
      setCurrentLocation(selectedLocation);
      setNewMessageCount(0);
      setShowScrollButton(false);
      
      // Scroll to bottom after location change
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [selectedLocation, currentLocation, scrollToBottom]);

  return (
    <Sidebar variant="sidebar" {...props} className="w-full max-w-sm border-l border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="p-4">
        <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            onTouchEnd={toggleDarkMode}
            className="h-12 w-12 md:h-10 md:w-10 lg:h-8 lg:w-8 p-0 hover:bg-accent/50 active:bg-accent/70 touch-manipulation cursor-pointer select-none"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isDarkMode ? <Sun className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground hover:text-foreground transition-colors pointer-events-none" /> : <Moon className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground hover:text-foreground transition-colors pointer-events-none" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-12 w-12 md:h-10 md:w-10 lg:h-8 lg:w-8 p-0 hover:bg-accent/50 active:bg-accent/70 touch-manipulation cursor-pointer"
            type="button"
          >
            <X className="h-6 w-6 md:h-5 md:w-5 lg:h-4 lg:w-4 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        
        <div className="px-1 -mt-0.5">
          <div className="flex items-center gap-2 mb-4">
            <RiRobot2Line className="h-5 w-5 text-blue-600" />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">SCC - Smart City Copilot</span>
              <span className="text-xs text-muted-foreground">by Team ChocoLava</span>
            </div>
          </div>
          
          {/* Model Selection Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between h-9 text-sm">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {GROQ_MODELS.find(m => m.id === selectedModel)?.name || "Select Model"}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-background/95 backdrop-blur border-border thin-scrollbar" align="start">
              <DropdownMenuLabel className="text-foreground">AI Models</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuRadioGroup value={selectedModel} onValueChange={handleModelChange}>
                {GROQ_MODELS.map((model) => (
                  <DropdownMenuRadioItem
                    key={model.id}
                    value={model.id}
                    className="flex flex-col items-start gap-1 py-3 text-foreground hover:bg-accent/50 focus:bg-accent/70"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{model.name}</span>
                      <span className="text-xs text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded">
                        {model.developer}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="-mt-2 flex flex-col h-full relative">
        {/* Messages Area */}
        <div className="flex-1 px-3 relative">
          <ScrollArea ref={scrollAreaRef} className="h-full pr-2 chatbox-scrollbar elegant-scrollbar">
            <div className="space-y-6 py-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  className={`flex message-fade-in ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col max-w-[95%] min-w-0 w-full">
                    {message.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-border/30 flex items-center justify-center">
                          {message.isStreaming ? (
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          ) : (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-xs font-medium text-foreground/80">
                          SCC
                          {message.isStreaming && (
                            <span className="text-blue-600 ml-1">typing...</span>
                          )}
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm border ${
                        message.sender === "user"
                          ? "bg-card border-border/50 ml-4 rounded-br-md"
                          : "bg-card/50 border-border/30 mr-4 rounded-bl-md"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <div className="prose prose-xs max-w-none dark:prose-invert text-xs break-words">
                          {renderMessageWithTableButtons(message.text, message.id)}
                        </div>
                      ) : (
                        <p className="break-words leading-relaxed text-foreground text-xs overflow-hidden">
                          {message.text}
                        </p>
                      )}
                      <span className="text-xs text-muted-foreground/70 mt-2 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t border-border/40">
        {/* Scroll to bottom button */}
        {(showScrollButton || newMessageCount > 0) && (
          <div className="flex justify-end mb-2">
            <Button
              onClick={scrollToBottom}
              variant="secondary"
              size="sm"
              className="relative h-8 px-3 rounded-full bg-background/95 backdrop-blur border border-border/60 shadow-lg hover:bg-accent/80 transition-all duration-200 text-foreground"
            >
              <RiArrowDownLine className="h-3 w-3 mr-1" />
              <span className="text-xs font-medium">
                {newMessageCount > 0 ? `${newMessageCount} new message${newMessageCount > 1 ? 's' : ''}` : "Scroll to bottom"}
              </span>
              {newMessageCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {newMessageCount > 9 ? '9+' : newMessageCount}
                </div>
              )}
            </Button>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isLoading ? "AI is responding..." : `Ask about ${currentLocation}...`}
            className="flex-1 h-10 rounded-xl border-border/50 focus:border-border focus:ring-1 focus:ring-ring/20 shadow-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm"
            disabled={isLoading || !newMessage.trim()}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <RiSendPlaneLine className="size-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </SidebarFooter>

      {/* Table Popup Dialog */}
      <Dialog open={tablePopup.isOpen} onOpenChange={closeTablePopup}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto bg-background/95 backdrop-blur border-border thin-scrollbar">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Table2 className="h-4 w-4" />
              Table View
            </DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none dark:prose-invert overflow-auto bg-background/50 rounded-md p-4 border border-border/50 [&_table]:bg-background/80 [&_th]:bg-muted/50 [&_td]:border-border [&_th]:border-border [&_table]:border-border">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                table: ({ children }) => (
                  <div className="overflow-x-auto my-1">
                    <table className="min-w-full border-collapse border border-border/30 text-sm">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted/50">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody>{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-muted/20">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="border border-border/30 px-4 py-3 bg-muted/50 font-semibold text-left text-foreground">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border/30 px-4 py-3 text-foreground">
                    {children}
                  </td>
                ),
              }}
            >
              {tablePopup.content}
            </ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}