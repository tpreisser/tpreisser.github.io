"use client";

import { cn } from "@/lib/utils";

export function FadeInView({
  children,
  className,
  delay = 0,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}>) {
  return (
    <div className={cn(className)} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
