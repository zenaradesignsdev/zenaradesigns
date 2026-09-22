import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Post dates are stored as UTC midnight (`new Date('2026-08-23')`). Formatting
// in the viewer's timezone renders the previous day west of UTC — and differs
// from the UTC server render, which breaks hydration. Always format in UTC.
const postDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatPostDate(date: Date | string): string {
  return postDateFormat.format(new Date(date));
}
