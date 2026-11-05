<template>
  <div class="app-page flex flex-col gap-5 md:max-w-[1080px]">
    <div class="flex h-11 items-center justify-between gap-3 md:hidden">
      <CommonLogo />
      <span class="ml-auto rounded-xl bg-sky-tint px-3 py-1.5 text-[13px] font-semibold">
        {{ reframeChip }}
      </span>
      <button
        type="button"
        class="icon-btn bg-soft text-[15px] font-bold"
        aria-label="Account"
        @click="emit('account')"
      >
        {{ initial }}
      </button>
    </div>

    <div class="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10">
      <section class="flex min-w-0 flex-col gap-5">
        <h1 class="text-display sr-only md:not-sr-only md:text-[40px] md:leading-[44px]">{{ prompt }}</h1>
        <div class="flex flex-col items-center rounded-[32px] bg-soft px-5 pt-5 pb-1">
          <p
            class="w-full rounded-[20px] rounded-bl-md bg-surface px-4 py-3 text-[17px] font-medium leading-6 md:text-[19px]"
          >
            Hey {{ firstName }}. Want to untangle something together?
          </p>
          <div class="my-3 h-[210px] w-[210px] dark:overflow-hidden dark:rounded-[28px] md:h-[270px] md:w-[270px]">
            <CommonIllustration alt="" />
          </div>
        </div>

        <button type="button" class="btn-primary h-[60px] w-full font-display text-[19px] font-bold" @click="emit('start')">
          Let&rsquo;s talk it through
        </button>
        <p class="-mt-2 text-center text-[15px] text-ink-2">4 short steps, about 8 minutes</p>
      </section>

      <section class="flex min-w-0 flex-col gap-5">
        <CommonLoadError v-if="loadFailed" what="records" @retry="emit('retry')" />

        <div class="grid grid-cols-2 gap-3">
          <NuxtLink to="/gratitude" class="flex flex-col gap-2.5 rounded-[24px] bg-sky p-4 text-ink dark:bg-sky-tint">
            <HeartIcon class="size-6 dark:text-sky" aria-hidden="true" />
            <span>
              <span class="block font-display text-[19px] font-bold">Gratitude</span>
              <span class="block text-[13px] font-medium">2 min</span>
            </span>
          </NuxtLink>
          <NuxtLink to="/meditation" class="flex flex-col gap-2.5 rounded-[24px] bg-storm p-4 text-storm-on">
            <MoonIcon class="size-6" aria-hidden="true" />
            <span>
              <span class="block font-display text-[19px] font-bold">Meditate</span>
              <span class="block text-[13px] font-medium">3 to 19 min</span>
            </span>
          </NuxtLink>
        </div>

        <div v-if="latestEntry" class="clear-card">
          <p class="card-label text-ink-2">Your last reframe, {{ latestDay }}</p>
          <p class="text-[17px] font-medium leading-[25px]">{{ latestEntry.disputes }}</p>
        </div>

        <div v-if="recentEntries.length" class="card hidden px-5 pb-1.5 md:block">
          <div class="flex items-center justify-between pb-1 pt-3.5">
            <h2 class="text-heading">Recent thoughts</h2>
            <NuxtLink to="/cbt" class="text-[15px] font-semibold">See all</NuxtLink>
          </div>
          <button
            v-for="entry in recentEntries"
            :key="entry.id"
            type="button"
            class="flex w-full flex-col items-start gap-0.5 border-b border-rule py-3 text-left last:border-b-0"
            @click="emit('open', entry)"
          >
            <span class="max-w-full truncate text-[17px] font-semibold">{{ entry.beliefs }}</span>
            <span class="max-w-full truncate text-[15px] text-ink-2">{{ entry.disputes }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon, MoonIcon } from "@heroicons/vue/24/outline";
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

const reframeChip = computed(() => {
  if (isLoading) return "Loading…";
  if (weekCount > 0) return `${weekCount} ${weekCount === 1 ? "reframe" : "reframes"} this week`;
  return latestEntry ? "Quiet week so far" : "Your first reframe awaits";
});
</script>
