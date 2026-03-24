"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LogoLink } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <div
        className={cn(
          "site-container flex items-center justify-between rounded-full border px-5 py-4 transition-all duration-300",
          scrolled
            ? "border-[color:rgba(255,255,255,0.08)] bg-[rgba(15,17,20,0.8)] shadow-[var(--shadow-soft)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <LogoLink />

        <nav className="hidden items-center gap-2 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Magnetic key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex rounded-full px-4 py-3 text-sm uppercase tracking-[0.16em] transition-colors duration-300",
                  pathname.startsWith(item.href)
                    ? "text-[color:var(--text-primary)]"
                    : "text-[color:var(--text-secondary)] hover:text-[color:var(--accent-oak)]",
                )}
              >
                {item.label}
              </Link>
            </Magnetic>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Magnetic>
            <Button href="/subscribe" size="sm">
              Subscribe
            </Button>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_72%,transparent)] text-[color:var(--text-primary)] lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                "h-px w-5 bg-current transition-transform duration-300",
                open && "translate-y-[0.28rem] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-current transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-current transition-transform duration-300",
                open && "-translate-y-[0.28rem] -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(11,13,17,0.94)] px-6 pb-8 pt-28 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-between">
              <div className="flex flex-col gap-4">
                {siteConfig.navigation.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{ delay: index * 0.08, duration: 0.28 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-[1.5rem] border border-[color:rgba(255,255,255,0.06)] bg-[color:rgba(255,255,255,0.02)] px-6 py-5 font-display text-3xl tracking-[-0.04em] text-[color:var(--text-primary)]"
                    >
                      {item.label}
                      <span className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--accent-oak)]">
                        Explore
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button href="/subscribe" className="flex-1" onClick={() => setOpen(false)}>
                  Never miss an episode
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
