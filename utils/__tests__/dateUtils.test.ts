import { describe, it, expect } from "vitest";
import {
  formatFirestoreTimestampDate,
  formatDate,
  weekDaysWithEntries,
  countThisWeek,
  isEvening,
  formatDayAndTime,
  formatDayHeading,
} from "@/utils/dateUtils";
import { Timestamp } from "firebase/firestore";

// 🕒 Create a fixed Timestamp for testing (e.g., Jan 1, 2025, 12:30 PM UTC)
const mockTimestamp = Timestamp.fromDate(new Date("2025-01-01T12:30:00Z"));

describe("Date Utils", () => {
  it("formats Firestore timestamp to a full date string", () => {
    const formatted = formatFirestoreTimestampDate(mockTimestamp);
    expect(formatted).toBe("Wednesday, January 1, 2025");
  });

  it("formats a Date object to a full date string", () => {
    const date = new Date("2025-01-01T12:30:00Z");
    const formatted = formatDate(date);
    expect(formatted).toBe("Wednesday, January 1, 2025");
  });
});

describe("Week helpers", () => {
  // Wednesday 5 November 2025, 21:00 local time
  const now = new Date(2025, 10, 5, 21, 0);

  it("flags the days of the current week that have entries", () => {
    const dates = [
      new Date(2025, 10, 3, 9, 0), // Monday
      new Date(2025, 10, 5, 8, 0), // Wednesday
      new Date(2025, 10, 5, 20, 0), // Wednesday again
      new Date(2025, 10, 1, 9, 0), // last Saturday, outside the week
    ];
    expect(weekDaysWithEntries(dates, now)).toEqual([true, false, true, false, false, false, false]);
  });

  it("counts entries in the current week only", () => {
    const dates = [new Date(2025, 10, 3), new Date(2025, 10, 9, 23), new Date(2025, 10, 10)];
    expect(countThisWeek(dates, now)).toBe(2);
  });

  it("treats 6pm to 5am as evening", () => {
    expect(isEvening(new Date(2025, 10, 5, 18, 0))).toBe(true);
    expect(isEvening(new Date(2025, 10, 5, 4, 59))).toBe(true);
    expect(isEvening(new Date(2025, 10, 5, 12, 0))).toBe(false);
  });

  it("formats the day and time for the home header", () => {
    expect(formatDayAndTime(now)).toBe("Wednesday, 9:00 pm");
  });

  it("labels day groups as Today, Yesterday or a date", () => {
    expect(formatDayHeading(new Date(2025, 10, 5, 8), now)).toBe("Today");
    expect(formatDayHeading(new Date(2025, 10, 4, 8), now)).toBe("Yesterday");
    expect(formatDayHeading(new Date(2025, 10, 1, 8), now)).toBe("Saturday, November 1");
  });
});
