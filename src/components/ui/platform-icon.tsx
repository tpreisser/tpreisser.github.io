export function PlatformIcon({
  platform,
  className = "h-5 w-5",
}: Readonly<{
  platform:
    | "YouTube"
    | "Spotify"
    | "Apple Podcasts"
    | "Google Podcasts"
    | "Instagram"
    | "X";
  className?: string;
}>) {
  switch (platform) {
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="6" width="18" height="12" rx="4" />
          <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Spotify":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M7.8 10.2c3.5-1.1 6.3-.9 8.6.2" />
          <path d="M8.3 13c2.8-.8 5-.7 6.8.1" />
          <path d="M8.9 15.7c2-.5 3.6-.5 5 .1" />
        </svg>
      );
    case "Apple Podcasts":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="8" r="1.9" />
          <path d="M10.9 12.6c0-.6.5-1.1 1.1-1.1s1.1.5 1.1 1.1v5.3c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1v-5.3Z" />
          <path d="M8 14.5a4 4 0 1 1 8 0" />
          <path d="M5.3 14.7a6.7 6.7 0 1 1 13.4 0" />
        </svg>
      );
    case "Google Podcasts":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <rect x="11" y="3" width="2" height="6" rx="1" />
          <rect x="11" y="15" width="2" height="6" rx="1" />
          <rect x="3" y="11" width="6" height="2" rx="1" />
          <rect x="15" y="11" width="6" height="2" rx="1" />
          <rect x="6.5" y="6.5" width="2" height="5" rx="1" />
          <rect x="15.5" y="12.5" width="2" height="5" rx="1" />
          <rect x="15.5" y="6.5" width="2" height="5" rx="1" />
          <rect x="6.5" y="12.5" width="2" height="5" rx="1" />
        </svg>
      );
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
          <path d="M5 4h4.2L19 20h-4.2L5 4Z" />
          <path d="M19 4 5 20" />
        </svg>
      );
    default:
      return null;
  }
}
