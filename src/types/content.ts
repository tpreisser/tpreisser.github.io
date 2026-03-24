export type SocialLink = {
  label: string;
  href: string;
};

export type Host = {
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  business: string;
  businessUrl: string;
  location: string;
  imageUrl: string | null;
  socials: SocialLink[];
};

export type EpisodeResource = {
  label: string;
  href: string | null;
};

export type SeriesPhase = {
  number: number;
  title: string;
  description: string;
  episodeIds: string[];
};

export type Series = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  episodeCount: number;
  phases: SeriesPhase[];
  seasonNumber: number;
};

export type Episode = {
  id: string;
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  seriesId: string;
  phase: number;
  phaseTitle: string;
  description: string;
  questionsAddressed: string[];
  talkTrackNotes: string;
  youtubeId: string | null;
  spotifyUrl: string | null;
  applePodcastsUrl: string | null;
  scriptureReferences: string[];
  resources: EpisodeResource[];
  publishedAt: string | null;
  duration: string | null;
  thumbnailUrl: string | null;
  heroVerse: string;
  keyTakeaways: string[];
};

export type Question = {
  id: string;
  questionText: string;
  episodeId: string;
  episodeSlug: string;
  episodeNumber: number;
  episodeTitle: string;
  phase: number;
  phaseTitle: string;
  seriesId: string;
  youtubeTimestamp: number | null;
  slug: string;
};
