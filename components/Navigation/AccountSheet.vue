<template>
  <CommonSheet :open="isOpen" @close="isOpen = false">
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-3.5">
        <span
          class="grid size-[52px] place-items-center rounded-full bg-sky-tint text-[19px] font-bold"
          >{{ initial }}</span
        >
        <div class="min-w-0">
          <p class="text-heading truncate">{{ displayName }}</p>
          <p class="truncate text-[15px] text-ink-3">{{ signInMethod }}</p>
        </div>
      </div>

      <div>
        <p class="mb-2 text-[13px] font-semibold text-ink-3">Style</p>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Style">
          <button
            v-for="option in APP_STYLES"
            :key="option.value"
            type="button"
            role="radio"
            :aria-checked="style === option.value"
            class="flex flex-col gap-2 rounded-2xl bg-surface p-2 pb-2.5 text-center text-[15px] font-semibold ring-inset transition-shadow"
            :class="style === option.value ? 'ring-2 ring-pen' : 'ring-1 ring-rule'"
            @click="style = option.value"
          >
            <span
              class="relative flex h-[68px] flex-col justify-end gap-1 overflow-hidden rounded-xl p-2"
              :style="previews[option.value].page"
              aria-hidden="true"
            >
              <span
                class="absolute left-2 top-1.5 text-[19px] font-bold leading-none"
                :style="previews[option.value].type"
                >Aa</span
              >
              <i class="block h-2.5 w-4/5" :style="previews[option.value].thought" />
              <i class="block h-2.5 w-3/5" :style="previews[option.value].answer" />
            </span>
            {{ option.label }}
          </button>
        </div>
      </div>

      <div>
        <p class="mb-2 text-[13px] font-semibold text-ink-3">Appearance</p>
        <div
          class="grid grid-cols-3 rounded-xl bg-sunken p-[3px]"
          role="radiogroup"
          aria-label="Appearance"
        >
          <button
            v-for="option in themeOptions"
            :key="option.value"
            type="button"
            role="radio"
            :aria-checked="savedTheme === option.value"
            class="h-10 rounded-[10px] text-[15px] font-semibold transition-colors"
            :class="
              savedTheme === option.value
                ? 'bg-surface text-ink shadow-sm dark:bg-ink/15'
                : 'text-ink-2'
            "
            @click="setTheme(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div class="card px-4">
        <a
          :href="TEMPLATE_URL"
          download
          target="_blank"
          rel="noopener"
          class="flex min-h-14 items-center gap-3.5 border-b border-rule"
          @click="shareTemplate"
        >
          <DocumentTextIcon class="size-6 text-ink-2" aria-hidden="true" />
          <span class="flex-1 text-[17px] font-medium">Paper template (PDF)</span>
          <ArrowDownTrayIcon class="size-5 text-ink-3" aria-hidden="true" />
        </a>
        <button
          type="button"
          class="flex min-h-14 w-full items-center gap-3.5 text-danger"
          @click="handleSignOut"
        >
          <ArrowRightStartOnRectangleIcon class="size-6" aria-hidden="true" />
          <span class="text-[17px] font-semibold">Sign out</span>
        </button>
      </div>
    </div>
  </CommonSheet>
</template>

<script setup lang="ts">
import {
  ArrowDownTrayIcon,
  ArrowRightStartOnRectangleIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";
import { APP_STYLES, type AppStyle } from "~/composables/useAppStyle";

const authStore = useAuthStore();
const isOpen = useState("account-sheet-open", () => false);
const { style } = useAppStyle();

// Fixed mini previews so each option shows its own paper, font and colours, whatever style is active.
type Preview = Record<"page" | "type" | "thought" | "answer", Record<string, string>>;

const LIGHT_PREVIEWS: Record<AppStyle, Preview> = {
  clearing: {
    page: { background: "#F5F7FA", boxShadow: "inset 0 0 0 1px #E1E6ED" },
    type: { fontFamily: "'Bricolage Grotesque'", color: "#1D2433" },
    thought: { background: "#3E4A61", borderRadius: "4px" },
    answer: { background: "#BFD9F2", borderRadius: "4px", boxShadow: "inset 3px 0 #FFC94D" },
  },
  workbook: {
    page: {
      backgroundColor: "#FBFBF8",
      backgroundImage: "linear-gradient(#E2E4EA 1px, transparent 1px), linear-gradient(90deg, #E2E4EA 1px, transparent 1px)",
      backgroundSize: "8px 8px",
      boxShadow: "inset 0 0 0 1.5px #1C1C1F",
      borderRadius: "4px",
    },
    type: { fontFamily: "'Schibsted Grotesk'", color: "#1C1C1F" },
    thought: { background: "#E4F46A", borderRadius: "1px" },
    answer: { background: "#2B45D4", height: "3px", borderRadius: "2px", marginTop: "4px" },
  },
  companion: {
    page: { background: "#FBF8FF", boxShadow: "inset 0 0 0 1px #E6E0F5", borderRadius: "16px" },
    type: { fontFamily: "Gabarito", color: "#2B2150" },
    thought: { background: "#2B2150", borderRadius: "999px" },
    answer: { background: "#8FE3C3", borderRadius: "999px" },
  },
  margin: {
    page: { background: "#F4F5F2", boxShadow: "inset 0 0 0 1px #D9DCD6", borderRadius: "10px" },
    type: { fontFamily: "Newsreader", fontStyle: "italic", fontWeight: "400", color: "#1A2233" },
    thought: { background: "#1A2233", height: "3px", borderRadius: "2px", boxShadow: "-6px 0 0 -1px #D9DCD6" },
    answer: { background: "#0F6E5C", height: "3px", borderRadius: "2px", boxShadow: "-6px 0 0 -1px #0F6E5C" },
  },
};

// Dark mode shows each style's own dark palette, so the sheet has no bright tiles.
const DARK_PREVIEWS: Record<AppStyle, Preview> = {
  clearing: {
    page: { background: "#11151D", boxShadow: "inset 0 0 0 1px #2E384E" },
    type: { fontFamily: "'Bricolage Grotesque'", color: "#ECEFF4" },
    thought: { background: "#2C3650", borderRadius: "4px" },
    answer: { background: "#BFD9F2", borderRadius: "4px", boxShadow: "inset 3px 0 #FFC94D" },
  },
  workbook: {
    page: {
      backgroundColor: "#141417",
      backgroundImage: "linear-gradient(#303038 1px, transparent 1px), linear-gradient(90deg, #303038 1px, transparent 1px)",
      backgroundSize: "8px 8px",
      boxShadow: "inset 0 0 0 1.5px #5C5C68",
      borderRadius: "4px",
    },
    type: { fontFamily: "'Schibsted Grotesk'", color: "#F2F2EE" },
    thought: { background: "#BACE44", borderRadius: "1px" },
    answer: { background: "#93A4FF", height: "3px", borderRadius: "2px", marginTop: "4px" },
  },
  companion: {
    page: { background: "#17132A", boxShadow: "inset 0 0 0 1px #483E74", borderRadius: "16px" },
    type: { fontFamily: "Gabarito", color: "#F1EEFC" },
    thought: { background: "#BFB3F0", borderRadius: "999px" },
    answer: { background: "#7FD9B8", borderRadius: "999px" },
  },
  margin: {
    page: { background: "#14181E", boxShadow: "inset 0 0 0 1px #303845", borderRadius: "10px" },
    type: { fontFamily: "Newsreader", fontStyle: "italic", fontWeight: "400", color: "#EEF0F3" },
    thought: { background: "#EEF0F3", height: "3px", borderRadius: "2px", boxShadow: "-6px 0 0 -1px #303845" },
    answer: { background: "#5FD1B2", height: "3px", borderRadius: "2px", boxShadow: "-6px 0 0 -1px #5FD1B2" },
  },
};

const colorMode = useColorMode();
const previews = computed(() => (colorMode.value === "dark" ? DARK_PREVIEWS : LIGHT_PREVIEWS));

// The saved choice ("auto" follows the device setting), kept separate from the resolved light or dark.
const savedTheme = colorMode.store;

type ThemeChoice = "light" | "dark" | "auto";

const setTheme = (value: ThemeChoice) => {
  savedTheme.value = value;
};

const themeOptions: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

const displayName = computed(
  () => authStore.user?.displayName || authStore.user?.email || "Account"
);
const initial = computed(() => displayName.value.charAt(0).toUpperCase());
const signInMethod = computed(() =>
  authStore.user?.providerData.some((p) => p.providerId === "google.com")
    ? "Signed in with Google"
    : authStore.user?.email || ""
);

const TEMPLATE_URL = "/pdf/cbt_exercise.pdf";
const templateFile = ref<File | null>(null);

// An installed iPhone app opens same-site PDFs in its own window with no way back, so it shares the file instead.
const isInstalledApp = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

// Loaded when the sheet opens, because iOS only allows the share sheet straight after the tap.
watch(isOpen, async (open) => {
  if (!open || templateFile.value || !isInstalledApp() || !navigator.canShare) return;

  try {
    const response = await fetch(TEMPLATE_URL);
    if (!response.ok) return;

    const file = new File([await response.blob()], "cogni-thought-record.pdf", {
      type: "application/pdf",
    });
    if (navigator.canShare({ files: [file] })) templateFile.value = file;
  } catch {
    // Offline: the link opens the file the normal way.
  }
});

const shareTemplate = async (event: MouseEvent) => {
  if (!templateFile.value) return;

  event.preventDefault();
  try {
    await navigator.share({ files: [templateFile.value] });
  } catch {
    // Closing the share sheet is not an error.
  }
};

const handleSignOut = async () => {
  isOpen.value = false;
  await authStore.logout();
};
</script>
