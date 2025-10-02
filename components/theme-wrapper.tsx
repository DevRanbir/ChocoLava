"use client";

import { useEffect } from 'react';
import { useTheme } from '@/contexts/theme-context';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Update the html class based on theme
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    }
  }, [isDarkMode]);

  return <>{children}</>;
}