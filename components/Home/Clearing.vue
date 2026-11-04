<template>
  <div class="app-page flex flex-col gap-5 md:max-w-[1080px]">
    <div class="flex h-11 items-center justify-between md:hidden">
      <CommonLogo />
      <button
        type="button"
        class="icon-btn bg-surface text-[15px] font-bold ring-1 ring-rule"
        aria-label="Account"
        @click="emit('account')"
      >
        {{ initial }}
      </button>
    </div>

    <div class="grid gap-5 md:grid-cols-[1.25fr_1fr] md:gap-10">
      <section class="flex flex-col gap-5">
        <div>
          <p class="text-[15px] font-medium text-ink-3">{{ dayAndTime }}</p>
          <h1
            class="text-display mt-1 md:text-[44px] md:leading-[48px] md:tracking-[-0.035em]"
          >
            {{ prompt }}
          </h1>
        </div>

        <div class="h-[206px] overflow-hidden rounded-[22px] md:h-[330px] md:rounded-[26px]">
          <CommonIllustration position="50% 62%" />
        </div>

        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <button type="button" class="btn-primary w-full md:w-auto" @click="emit('start')">
            Start a thought record
          </button>
          <p class="hidden text-[15px] text-ink-2 md:block">
            4 short steps, about 8 minutes
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-5">
        <div class="card flex items-center justify-between p-4 md:ring-1 md:ring-rule">
          <div>
            <p class="text-[13px] font-semibold text-ink-3">This week</p>
            <p class="text-[17px] font-bold">
              {{
                weekCount === 0
                  ? "No records yet"
                  : `${weekCount} ${weekCount === 1 ? "storm" : "storms"} cleared`
              }}
            </p>
          </div>
          <HomeWeekDots :week-days="weekDays" />
        </div>

        <div v-if="latestEntry" class="clear-card">
          <p class="card-label text-ink-2">
            <SunIcon class="size-4 text-ink" aria-hidden="true" />
            Your last clearer view, {{ latestDay }}
          </p>
          <p class="text-[15px] font-medium leading-[21px]">{{ latestEntry.disputes }}</p>
        </div>
        <div v-else class="clear-card">
          <p class="card-label text-ink-2">
            <SunIcon class="size-4 text-ink" aria-hidden="true" />
            How it works
          </p>
          <p class="text-[15px] leading-[21px]">
            Write what happened, the thought, and how it felt. Then find a
            clearer view of it. Thoughts are like weather: they pass.
          </p>
        </div>

        <div
          v-if="recentEntries.length"
          class="card hidden px-5 pb-1.5 ring-1 ring-rule md:block"
        >
          <div class="flex items-center justify-between pb-1 pt-3.5">
            <h2 class="text-heading">Recent thoughts</h2>
            <NuxtLink to="/cbt" class="text-[15px] font-semibold">See all</NuxtLink>
          </div>
          <button
            v-for="entry in recentEntries"
            :key="entry.id"
            type="button"
            class="flex w-full items-start gap-3.5 border-b border-rule py-3.5 text-left last:border-b-0"
            @click="emit('open', entry)"
          >
            <span
              class="grid size-10 shrink-0 place-items-center rounded-full bg-sky-tint text-pen"
            >
              <SunIcon class="size-[22px]" aria-hidden="true" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-[17px] font-semibold">{{ entry.beliefs }}</span>
              <span class="block truncate text-[15px] text-ink-2">{{ entry.disputes }}</span>
            </span>
          </button>
        </div>

        <div class="hidden gap-3 md:grid md:grid-cols-2">
          <NuxtLink to="/gratitude" class="card p-4 ring-1 ring-rule hover:bg-sunken">
            <SunIcon class="size-6 text-sun-icon" aria-hidden="true" />
            <p class="mt-2 text-[17px] font-semibold">Gratitude</p>
            <p class="text-[15px] text-ink-3">One good thing today</p>
          </NuxtLink>
          <NuxtLink to="/meditation" class="card p-4 ring-1 ring-rule hover:bg-sunken">
            <MoonIcon class="size-6" aria-hidden="true" />
            <p class="mt-2 text-[17px] font-semibold">Meditate</p>
            <p class="text-[15px] text-ink-3">Guided audio, 3 to 19 min</p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
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
</script>
