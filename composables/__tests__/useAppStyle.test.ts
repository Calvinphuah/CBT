import { describe, it, expect } from "vitest";
import { APP_STYLES, STYLE_COPY, isAppStyle } from "@/composables/useAppStyle";

describe("App styles", () => {
  it("accepts only the three known styles", () => {
    expect(isAppStyle("clearing")).toBe(true);
    expect(isAppStyle("workbook")).toBe(true);
    expect(isAppStyle("companion")).toBe(true);
    expect(isAppStyle("margin")).toBe(false);
    expect(isAppStyle(null)).toBe(false);
  });

  it("has wording for every style in the picker", () => {
    for (const { value } of APP_STYLES) {
      const copy = STYLE_COPY[value];
      for (const text of Object.values(copy)) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
