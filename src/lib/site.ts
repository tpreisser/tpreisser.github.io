export const siteConfig = {
  name: "The Iron & Oak Podcast",
  shortName: "Iron & Oak",
  description:
    "Tyler Preisser and Lincoln Myers wrestle with the hardest questions about faith, God, and belief. Rooted in Scripture. Forged in honesty.",
  baseUrl: "https://iron-and-oak.vercel.app",
  location: "Hays, Kansas",
  tagline: "Where Iron Sharpens Iron and Deep Roots Hold.",
  shortTagline: "Hard Questions. Honest Faith. No Easy Answers.",
  email: "hello@ironandoakpodcast.com",
  socials: [
    {
      label: "YouTube",
      href: "https://www.youtube.com",
    },
    {
      label: "Spotify",
      href: "https://open.spotify.com",
    },
    {
      label: "Apple Podcasts",
      href: "https://podcasts.apple.com",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com",
    },
  ],
  navigation: [
    {
      label: "Episodes",
      href: "/episodes",
    },
    {
      label: "Series",
      href: "/series",
    },
    {
      label: "Questions",
      href: "/questions",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
} as const;
