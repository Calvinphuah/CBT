<template>
  <div class="app-page flex flex-col gap-5 md:max-w-[1080px]">
    <div class="flex h-12 items-center justify-between md:hidden">
      <CommonLogo />
      <CommonHandNote :tilt="3">{{ shortDate }}</CommonHandNote>
      <button
        type="button"
        class="icon-btn rounded-lg bg-surface text-[15px] font-bold ring-[1.5px] ring-line"
        aria-label="Account"
        @click="emit('account')"
      >
        {{ initial }}
      </button>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-10">
      <section class="flex min-w-0 flex-col gap-5">
        <div class="hidden md:block">
          <CommonHandNote :tilt="-2">{{ shortDate }}</CommonHandNote>
        </div>
        <h1
          class="font-display text-[34px] font-extrabold leading-[36px] tracking-[-0.04em] md:text-[48px] md:leading-[50px]"
        >
          Write it down. Then look again.
        </h1>

        <div class="art-frame mx-1 h-[196px] overflow-hidden md:h-[300px]">
          <CommonIllustration alt="" />
        </div>

        <div class="card card-pop p-5 md:max-w-md">
          <h2 class="text-heading">New thought record</h2>
          <p class="mt-1 text-[15px] text-ink-2">4 questions, about 8 minutes</p>
          <button type="button" class="btn-primary mt-4 w-full md:w-auto" @click="emit('start')">
            Open a fresh page
          </button>
        </div>
        <div class="flex justify-end pr-2">
          <CommonHandNote :tilt="4">start here when your head is loud</CommonHandNote>
        </div>
      </section>

      <section class="flex min-w-0 flex-col gap-5">
        <CommonLoadError v-if="loadFailed" what="pages" @retry="emit('retry')" />

        <div class="card flex items-center justify-between bg-surface p-4">
          <div>
            <p class="text-[13px] font-semibold text-ink-3">This week</p>
            <p class="text-[17px] font-bold">
              {{ weekSummary }}
            </p>
          </div>
          <HomeWeekDots :week-days="weekDays" />
        </div>

        <div v-if="latestEntry" class="flex flex-col gap-1.5">
          <CommonHandNote>last time you saw it differently:</CommonHandNote>
          <div class="clear-card">
            <p class="text-[17px] leading-[25px]">{{ latestEntry.disputes }}</p>
          </div>
        </div>

        <div v-if="recentEntries.length" class="card hidden bg-surface px-5 pb-1.5 md:block">
          <div class="flex items-center justify-between pb-1 pt-3.5">
            <h2 class="text-heading">Recent pages</h2>
            <NuxtLink to="/cbt" class="text-[15px] font-semibold text-pen">See all</NuxtLink>
          </div>
          <button
            v-for="entry in recentEntries"
            :key="entry.id"
            type="button"
            class="flex w-full flex-col items-start gap-1 border-b border-rule py-3 text-left last:border-b-0"
            @click="emit('open', entry)"
          >
            <span class="max-w-full truncate bg-sun px-1 text-[17px] font-semibold text-sun-on">{{
              entry.beliefs
            }}</span>
            <span class="max-w-full truncate text-[15px] text-pen">{{ entry.disputes }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CBTEntry } from "@/types/cbt";

const { weekCount, latestEntry, isLoading } = defineProps<{
  dayAndTime: string;
  prompt: string;
  weekDays: boolean[];
  weekCount: number;
  latestEntry?: CBTEntry;
  latestDay: string;
  recentEntries: CBTEntry[];
  firstName: string;
  initial: string;
  isLoading: boolean;
  loadFailed: boolean;
}>();

const emit = defineEmits<{
  (e: "start" | "account" | "retry"): void;
  (e: "open", entry: CBTEntry): void;
}>();

const shortDate = new Date().toLocaleDateString("en-US", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const weekSummary = computed(() => {
  if (isLoading) return "Loading your week…";
  if (weekCount > 0) return `${weekCount} ${weekCount === 1 ? "page" : "pages"} written`;
  return latestEntry ? "Nothing this week, and that’s okay" : "No pages yet";
});
</script>
