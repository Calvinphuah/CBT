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
                ? 'bg-surface text-ink shadow-sm'
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
          href="/pdf/cbt_exercise.pdf"
          download
          class="flex min-h-14 items-center gap-3.5 border-b border-rule"
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

const authStore = useAuthStore();
const isOpen = useState("account-sheet-open", () => false);
// The saved choice ("auto" means match the phone), kept separate from the resolved light or dark.
const savedTheme = useColorMode().store;

type ThemeChoice = "light" | "dark" | "auto";

const setTheme = (value: ThemeChoice) => {
  savedTheme.value = value;
};

const themeOptions: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Match phone" },
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

const handleSignOut = async () => {
  isOpen.value = false;
  await authStore.logout();
};
</script>
