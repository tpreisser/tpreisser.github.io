import { cn } from "@/lib/utils";

export function BrandEmblem({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <span className={cn("brand-emblem h-12 w-12 text-[color:var(--text-primary)]", className)}>
      <svg viewBox="0 0 64 64" className="h-[78%] w-[78%]" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="21" stroke="rgba(196,132,62,0.38)" strokeWidth="1.5" />
        <path
          d="M32 48V17"
          stroke="url(#emblem-trunk)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M32 22C36 20 39.5 17.5 43 14.5"
          stroke="url(#emblem-branch)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M32 27C38 26 43 27 48 29"
          stroke="url(#emblem-branch)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 34C37 35 41 38.5 45 43"
          stroke="url(#emblem-branch)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 42C29 44 26.5 47 24.5 50.5"
          stroke="url(#emblem-branch)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 39C27.5 39 23.5 40.5 19 43"
          stroke="url(#emblem-branch)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 28C26.5 27 21.5 27.5 16 29.5"
          stroke="url(#emblem-branch)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M32 21C28 19.5 24.5 16.8 21.5 13.5"
          stroke="url(#emblem-branch)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="emblem-trunk" x1="32" y1="17" x2="32" y2="48">
            <stop stopColor="#d9e4ef" />
            <stop offset="0.44" stopColor="#8aa0b5" />
            <stop offset="1" stopColor="#435362" />
          </linearGradient>
          <linearGradient id="emblem-branch" x1="20" y1="12" x2="47" y2="48">
            <stop stopColor="#f0cda1" />
            <stop offset="0.46" stopColor="#c4843e" />
            <stop offset="1" stopColor="#7890a6" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
