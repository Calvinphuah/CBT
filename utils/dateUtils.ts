import type { Timestamp } from "firebase/firestore";

export function formatFirestoreTimestampDate(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatFirestoreTimestampTime(
  timestamp: Timestamp,
  locale: string = "en-US"
): string {
  const date = timestamp.toDate();

  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Monday-first flags for the week containing `now`, true where a date falls on that day.
export function weekDaysWithEntries(dates: Date[], now: Date = new Date()): boolean[] {
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

  const days = Array(7).fill(false);
  for (const date of dates) {
    const dayIndex = Math.floor((date.getTime() - monday.getTime()) / 86400000);
    if (dayIndex >= 0 && dayIndex < 7) days[dayIndex] = true;
  }
  return days;
}

export function countThisWeek(dates: Date[], now: Date = new Date()): number {
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);

  return dates.filter((date) => date >= monday && date < nextMonday).length;
}

export function isEvening(date: Date): boolean {
  const hour = date.getHours();
  return hour >= 18 || hour < 5;
}

export function formatDayAndTime(date: Date): string {
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase();
  return `${day}, ${time}`;
}

// "Today", "Yesterday", or a full date for older groups.
export function formatDayHeading(date: Date, now: Date = new Date()): string {
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const daysAgo = Math.round((startOf(now) - startOf(date)) / 86400000);
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
