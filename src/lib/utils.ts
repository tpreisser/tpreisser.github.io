import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatEpisodeNumber(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatDate(value: string | null) {
  if (!value) {
    return "Coming soon";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function absoluteUrl(path = "/") {
  return new URL(path, "https://iron-and-oak.vercel.app").toString();
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
