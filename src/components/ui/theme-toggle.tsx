"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_72%,transparent)]"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_78%,transparent)] text-[color:var(--text-primary)] transition-[border-color,background-color] duration-300 hover:border-[color:var(--border-hover)]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isDark ? (
          <>
            <path d="M18.2 15.4A6.7 6.7 0 1 1 8.6 5.8 7.4 7.4 0 1 0 18.2 15.4Z" />
          </>
        ) : (
          <>
            <path d="M12 3v2.2" />
            <path d="M12 18.8V21" />
            <path d="M4.9 4.9l1.6 1.6" />
            <path d="M17.5 17.5l1.6 1.6" />
            <path d="M3 12h2.2" />
            <path d="M18.8 12H21" />
            <path d="M4.9 19.1l1.6-1.6" />
            <path d="M17.5 6.5l1.6-1.6" />
            <circle cx="12" cy="12" r="4.2" />
          </>
        )}
      </svg>
    </button>
  );
}
