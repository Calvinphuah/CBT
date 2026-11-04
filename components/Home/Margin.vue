<template>
  <div class="app-page flex flex-col gap-6 md:max-w-[1080px]">
    <div class="flex h-11 items-center justify-between md:hidden">
      <CommonLogo />
      <button
        type="button"
        class="icon-btn bg-soft text-[15px] font-bold text-btn"
        aria-label="Account"
        @click="emit('account')"
      >
        {{ initial }}
      </button>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-12">
      <section class="flex min-w-0 flex-col gap-6">
        <div>
          <h1 class="text-title md:text-[36px] md:leading-[42px] md:tracking-[-0.02em]">
            {{ greeting }}, {{ firstName }}.
          </h1>
          <p class="mt-1 text-[17px] text-ink-2">{{ prompt }}</p>
        </div>

        <nav class="flex flex-col gap-2.5" aria-label="Start">
          <button
            type="button"
            class="card flex items-center gap-3.5 p-4 text-left ring-1 ring-rule transition-colors hover:bg-sunken"
            @click="emit('start')"
          >
            <PencilIcon class="size-6 shrink-0 text-btn" aria-hidden="true" />
            <span class="min-w-0 flex-1">
              <span class="block text-[17px] font-semibold">Write it down</span>
              <span class="block text-[15px] text-ink-2">A thought that won’t let go</span>
            </span>
            <ChevronRightIcon class="size-5 shrink-0 text-ink-3" aria-hidden="true" />
          </button>
          <NuxtLink
            to="/gratitude"
            class="card flex items-center gap-3.5 p-4 ring-1 ring-rule transition-colors hover:bg-sunken"
          >
            <HeartIcon class="size-6 shrink-0 text-sun-icon" aria-hidden="true" />
            <span class="min-w-0 flex-1">
              <span class="block text-[17px] font-semibold">Three good things</span>
              <span class="block text-[15px] text-ink-2">Two minutes before bed</span>
            </span>
            <ChevronRightIcon class="size-5 shrink-0 text-ink-3" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink
            to="/meditation"
            class="card flex items-center gap-3.5 p-4 ring-1 ring-rule transition-colors hover:bg-sunken"
          >
            <MoonIcon class="size-6 shrink-0 text-ink-2" aria-hidden="true" />
            <span class="min-w-0 flex-1">
              <span class="block text-[17px] font-semibold">Press play</span>
              <span class="block text-[15px] text-ink-2">Guided audio, 3 to 19 min</span>
            </span>
            <ChevronRightIcon class="size-5 shrink-0 text-ink-3" aria-hidden="true" />
          </NuxtLink>
        </nav>
      </section>

      <section class="flex min-w-0 flex-col gap-6">
        <div class="flex items-center justify-between border-b border-rule pb-4">
          <div>
            <p class="text-[14px] text-ink-3">This week</p>
            <p class="text-[17px] font-semibold">
              {{
                weekCount === 0
                  ? "Nothing written yet"
                  : `${weekCount} ${weekCount === 1 ? "thought" : "thoughts"} written down`
              }}
            </p>
          </div>
          <HomeWeekDots :week-days="weekDays" />
        </div>

        <button
          v-if="latestEntry"
          type="button"
          class="clear-card text-left"
          @click="emit('open', latestEntry)"
        >
          <span class="card-label block text-ink-3">Your last answer, {{ latestDay }}</span>
          <span class="block">“{{ latestEntry.disputes }}”</span>
        </button>
        <div v-else class="clear-card">
          <p class="card-label text-ink-3">How it works</p>
          <p>
            Write down what happened and the thought it brought. Then write
            another way to see it, here in the margin.
          </p>
        </div>

        <div v-if="recentEntries.length" class="hidden md:block">
          <div class="flex items-center justify-between pb-1">
            <h2 class="text-heading">Recent thoughts</h2>
            <NuxtLink to="/cbt" class="text-[15px] font-semibold text-btn">See all</NuxtLink>
          </div>
          <button
            v-for="entry in recentEntries"
            :key="entry.id"
            type="button"
            class="block w-full border-b border-rule py-3.5 text-left last:border-b-0"
            @click="emit('open', entry)"
          >
            <span class="block truncate text-[17px] font-semibold">{{ entry.beliefs }}</span>
            <span class="note-text block truncate text-pen">{{ entry.disputes }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRightIcon,
  HeartIcon,
  MoonIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import type { CBTEntry } from "@/types/cbt";

defineProps<{
  dayAndTime: string;
  prompt: string;
  weekDays: boolean[];
  weekCount: number;
  latestEntry?: CBTEntry;
  latestDay: string;
  recentEntries: CBTEntry[];
  firstName: string;
  initial: string;
}>();

const emit = defineEmits<{
  (e: "start" | "account"): void;
  (e: "open", entry: CBTEntry): void;
}>();

const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
</script>
