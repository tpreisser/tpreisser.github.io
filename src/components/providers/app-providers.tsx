"use client";

import type { PropsWithChildren } from "react";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
