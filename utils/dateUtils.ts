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
