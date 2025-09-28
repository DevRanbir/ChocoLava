"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DatePicker from "@/components/date-picker";
import { RiExpandRightLine, RiShareBoxLine, RiShareForwardBoxLine, } from "@remixicon/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ActionButtonsProps {
  onExport?: () => void;
  hasDateFilter?: boolean;
}

export function ActionButtons({ onExport, hasDateFilter = false }: ActionButtonsProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);

  const handleDemoClick = () => {
    router.push('/demo');
  };

  const handleExportClick = async () => {
    if (isExporting) return;
    
    setIsExporting(true);
    
    try {
      // Call the parent's export handler
      if (onExport) {
        await onExport();
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
                size={isMobile ? 16 : 20}
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
                size={isMobile ? 16 : 20}
                aria-hidden="true"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Demo
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
