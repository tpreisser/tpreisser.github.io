"use client";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MaterialBackground } from "@/components/ui/material-background";
import { PageTransition } from "@/components/ui/page-transition";
import { SparkCanvas } from "@/components/ui/spark-canvas";

export function SiteChrome({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MaterialBackground />
      <SparkCanvas />
      <SiteHeader />
      <main className="relative z-10 overflow-x-clip pt-24">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
    </>
  );
}
