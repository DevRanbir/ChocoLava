"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DatePicker from "@/components/date-picker";
import { RiExpandRightLine, RiShareBoxLine, RiShareForwardBoxLine, RiContactsLine, RiSunLine, RiMoonLine, RiCustomerService2Fill, RiHomeLine, RiMoreLine } from "@remixicon/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionButtonsProps {
  onExport?: () => void;
  hasDateFilter?: boolean;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export function ActionButtons({ onExport, hasDateFilter = false, isDarkMode, toggleDarkMode }: ActionButtonsProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const [wasInDarkMode, setWasInDarkMode] = useState(false);

  const handleDemoClick = () => {
    router.push('/demo');
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleHomeClick = () => {
    router.push('/landing');
  };

  const handleExportClick = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    
    try {
      // Switch to day mode for export if currently in dark mode
      if (isDarkMode && toggleDarkMode) {
        setWasInDarkMode(true);
        toggleDarkMode();
        // Wait for theme to update
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Call the parent's export handler
      if (onExport) {
        await onExport();
      }
      
      // Restore dark mode if it was enabled before export
      if (wasInDarkMode && toggleDarkMode) {
        toggleDarkMode();
        setWasInDarkMode(false);
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3">
      <div className={`${hasDateFilter ? 'keep-date-picker' : 'no-print'} date-picker`}>
        <DatePicker />
      </div>
      
      {/* Mobile Menu */}
      {isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="aspect-square h-9 w-9"
            >
              <RiMoreLine
                className="opacity-40 size-4"
                size={16}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleExportClick} disabled={isExporting}>
              <RiExpandRightLine className="mr-2 h-4 w-4" />
              {isExporting ? "Exporting..." : "Export"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDemoClick}>
              <RiShareBoxLine className="mr-2 h-4 w-4" />
              Demo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleContactClick}>
              <RiCustomerService2Fill className="mr-2 h-4 w-4" />
              Contact
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleHomeClick}>
              <RiHomeLine className="mr-2 h-4 w-4" />
              Home
            </DropdownMenuItem>
            {toggleDarkMode && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <>
                      <RiSunLine className="mr-2 h-4 w-4" />
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <RiMoonLine className="mr-2 h-4 w-4" />
                      Switch to Dark Mode
                    </>
                  )}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        /* Desktop Buttons */
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="aspect-square max-lg:p-0 h-9 w-9 sm:h-10 sm:w-10" 
                onClick={handleExportClick}
                disabled={isExporting}
              >
                <RiExpandRightLine
                  className="lg:-ms-1 opacity-40 size-4 sm:size-5"
                  size={20}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isExporting ? "Exporting..." : "Export"}
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="aspect-square max-lg:p-0 h-9 w-9 sm:h-10 sm:w-10"
                onClick={handleDemoClick}
              >
                <RiShareBoxLine
                  className="lg:-ms-1 opacity-40 size-4 sm:size-5"
                  size={20}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Demo
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="aspect-square max-lg:p-0 h-9 w-9 sm:h-10 sm:w-10"
                onClick={handleContactClick}
              >
                <RiCustomerService2Fill
                  className="lg:-ms-1 opacity-40 size-4 sm:size-5"
                  size={20}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Contact
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="aspect-square max-lg:p-0 h-9 w-9 sm:h-10 sm:w-10"
                onClick={handleHomeClick}
              >
                <RiHomeLine
                  className="lg:-ms-1 opacity-40 size-4 sm:size-5"
                  size={20}
                  aria-hidden="true"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Home
            </TooltipContent>
          </Tooltip>
          
          {/* Theme Toggle Button */}
          {toggleDarkMode && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="aspect-square max-lg:p-0 h-9 w-9 sm:h-10 sm:w-10"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? (
                    <RiSunLine
                      className="lg:-ms-1 opacity-40 size-4 sm:size-5"
                      size={20}
                      aria-hidden="true"
                    />
                  ) : (
                    <RiMoonLine
                      className="lg:-ms-1 opacity-40 size-4 sm:size-5"
                      size={20}
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      )}
    </div>
  );
}
