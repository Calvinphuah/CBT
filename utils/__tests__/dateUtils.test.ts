import { describe, it, expect } from "vitest";
import {
  formatFirestoreTimestampDate,
  formatFirestoreTimestampTime,
  formatDate,
} from "@/utils/dateUtils";
import { Timestamp } from "firebase/firestore";

// 🕒 Create a fixed Timestamp for testing (e.g., Jan 1, 2025, 12:30 PM UTC)
const mockTimestamp = Timestamp.fromDate(new Date("2025-01-01T12:30:00Z"));

describe("Date Utils", () => {
  it("formats Firestore timestamp to a full date string", () => {
    const formatted = formatFirestoreTimestampDate(mockTimestamp);
    expect(formatted).toBe("Wednesday, January 1, 2025");
  });

  it("formats Firestore timestamp to a time string", () => {
    const formatted = formatFirestoreTimestampTime(mockTimestamp, "en-US");
    expect(formatted).toBe("08:30 PM");
  });

  it("formats a Date object to a full date string", () => {
    const date = new Date("2025-01-01T12:30:00Z");
    const formatted = formatDate(date);
    expect(formatted).toBe("Wednesday, January 1, 2025");
  });
});
