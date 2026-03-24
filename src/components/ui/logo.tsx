import Link from "next/link";

import { BrandEmblem } from "@/components/ui/brand-emblem";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  withTagline = false,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandEmblem className={withTagline ? "h-14 w-14" : "h-11 w-11"} />
      <div className="flex flex-col gap-1">
        <span className="font-display text-lg font-black uppercase tracking-[0.32em] text-[color:var(--text-primary)]">
          <span className="text-[color:var(--accent-iron-light)]">Iron</span>
          <span className="mx-2 text-[color:var(--accent-oak)]">&amp;</span>
          <span className="text-[color:var(--accent-oak-light)]">Oak</span>
        </span>
        {withTagline ? (
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
            Forged in conviction. Rooted in truth.
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="The Iron & Oak Podcast home"
      className={cn("inline-flex items-center", className)}
    >
      <Logo />
    </Link>
  );
}
