export type AppStyle = "clearing" | "workbook" | "companion";

export interface StyleCopy {
  thoughtLabel: string;
  answerLabel: string;
  answerQuestion: string;
  answerHelp: string;
  saveLabel: string;
  savedTitle: string;
  loginTitle: string;
}

export const APP_STYLES: { value: AppStyle; label: string }[] = [
  { value: "clearing", label: "Clearing" },
  { value: "workbook", label: "Workbook" },
  { value: "companion", label: "Companion" },
];

// The words that change with each style; the steps and data stay the same.
export const STYLE_COPY: Record<AppStyle, StyleCopy> = {
  clearing: {
    thoughtLabel: "The storm",
    answerLabel: "The clearer view",
    answerQuestion: "What’s the clearer view?",
    answerHelp: "Is the thought 100% true? What would you tell a friend who said it?",
    saveLabel: "Save record",
    savedTitle: "The sky’s a little clearer.",
    loginTitle: "Hard thoughts pass. Let’s help them along.",
  },
  workbook: {
    thoughtLabel: "You wrote",
    answerLabel: "Your answer",
    answerQuestion: "Is that 100% true?",
    answerHelp: "Look for the facts that don’t fit it, even small ones.",
    saveLabel: "Save this page",
    savedTitle: "Page saved. You talked back.",
    loginTitle: "Write it down. Then talk back.",
  },
  companion: {
    thoughtLabel: "Your thought",
    answerLabel: "Your reframe",
    answerQuestion: "Is that really true?",
    answerHelp: "Look for what doesn’t fit, or think about what you’d tell a friend.",
    saveLabel: "Save my reframe",
    savedTitle: "Nice work. That thought has less grip now.",
    loginTitle: "Hey there. Let’s untangle things together.",
  },
};

export function isAppStyle(value: unknown): value is AppStyle {
  return value === "clearing" || value === "workbook" || value === "companion";
}

// Saved on this device, so the sign-in page can show the last style picked.
export function useAppStyle() {
  const style = useLocalStorage<AppStyle>("cogni-style", "clearing");
  if (!isAppStyle(style.value)) style.value = "clearing";

  const copy = computed(() => STYLE_COPY[style.value]);

  return { style, copy };
}
