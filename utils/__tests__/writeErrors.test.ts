import { afterEach, describe, expect, it, vi } from "vitest";
import {
  OFFLINE_ERROR,
  assertOnline,
  deleteErrorMessage,
  saveErrorMessage,
} from "../writeErrors";

describe("assertOnline", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("throws the offline error when the device is offline", () => {
    vi.stubGlobal("navigator", { onLine: false });
    expect(() => assertOnline()).toThrow(OFFLINE_ERROR);
  });

  it("does nothing when the device is online", () => {
    vi.stubGlobal("navigator", { onLine: true });
    expect(() => assertOnline()).not.toThrow();
  });
});

describe("saveErrorMessage", () => {
  it("tells people they are offline", () => {
    expect(saveErrorMessage(new Error(OFFLINE_ERROR))).toContain("offline");
  });

  it("falls back to a general message", () => {
    expect(saveErrorMessage(new Error("permission-denied"))).toBe(
      "Couldn’t save. Your words are still here, so try again."
    );
  });
});

describe("deleteErrorMessage", () => {
  it("says it was not deleted when offline", () => {
    expect(deleteErrorMessage(new Error(OFFLINE_ERROR))).toContain("wasn’t deleted");
  });

  it("falls back to a general message", () => {
    expect(deleteErrorMessage("boom")).toBe("Couldn’t delete it. Please try again.");
  });
});
