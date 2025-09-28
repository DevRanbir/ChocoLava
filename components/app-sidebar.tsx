"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
import { RiSendPlaneLine, RiChatSmile3Line } from "@remixicon/react";

// Utility function to format timestamps consistently
const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Sample chat messages with static timestamps to avoid hydration issues
const sampleMessages = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    sender: "bot",
    timestamp: "2:08 PM",
  },
  {
    id: 2,
    text: "I need help with my account",
    sender: "user",
    timestamp: "2:08 PM",
  },
  {
    id: 3,
    text: "I'd be happy to help you with your account. What specific issue are you experiencing?",
    sender: "bot",
    timestamp: "2:09 PM",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [messages, setMessages] = React.useState(sampleMessages);
  const [newMessage, setNewMessage] = React.useState("");
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { setOpen } = useSidebar();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user" as const,
      timestamp: formatTimestamp(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! I'll get back to you shortly.",
        sender: "bot" as const,
        timestamp: formatTimestamp(new Date()),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader className="border-b border-border/40 pb-4 mb-6 relative">
        {/* Close button - always visible, top right corner */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-2 right-2 h-10 w-10 md:h-8 md:w-8 p-0 hover:bg-transparent"
        >
          <X className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground hover:text-foreground transition-colors" />
          <span className="sr-only">Close sidebar</span>
        </Button>
        
        <div className="px-1 mt-8">
        </div>
      </SidebarHeader>
      
      <SidebarContent className="-mt-2 flex flex-col h-full">
        {/* Messages Area */}
        <div className="flex-1 px-3">
          <ScrollArea ref={scrollAreaRef} className="h-full pr-2 chatbox-scrollbar">
            <div className="space-y-6 py-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex message-fade-in ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col max-w-[80%]">
                    {message.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-border/30 flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-xs font-medium text-foreground/80">Assistant</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm shadow-sm border ${
                        message.sender === "user"
                          ? "bg-card border-border/50 ml-8 rounded-br-md"
                          : "bg-card/50 border-border/30 mr-8 rounded-bl-md"
                      }`}
                    >
                      <p className="break-words leading-relaxed text-foreground">{message.text}</p>
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
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 h-10 rounded-xl border-border/50 focus:border-border focus:ring-1 focus:ring-ring/20 shadow-sm"
            disabled={false}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10 shrink-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            disabled={!newMessage.trim()}
          >
            <RiSendPlaneLine className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}
