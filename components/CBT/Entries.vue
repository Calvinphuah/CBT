<template>
  <div class="app-page flex flex-col gap-3">
    <div class="flex min-h-14 items-center justify-between">
      <h1 class="text-display">Thoughts</h1>
      <button
        type="button"
        class="icon-btn-filled"
        aria-label="New thought record"
        @click="cbtStore.handleNewEntry"
      >
        <PlusIcon class="size-6" aria-hidden="true" />
      </button>
    </div>

    <p v-if="entries.length" class="-mt-2 text-[15px] text-ink-3">
      {{ entries.length }} {{ entries.length === 1 ? "record" : "records" }}
    </p>

    <p v-if="cbtStore.loading && !entries.length" class="py-10 text-center text-ink-2">
      Loading your records&hellip;
    </p>

    <div v-else-if="!entries.length" class="clear-card mt-2 flex flex-col gap-3 p-5">
      <SunIcon class="size-7 text-ink" aria-hidden="true" />
      <h2 class="text-heading text-ink">Start your first thought record</h2>
      <p class="text-[15px] leading-[21px] text-ink-2">
        When a thought won&rsquo;t let go, write it down in four short steps
        and find a clearer view of it. It takes about 8 minutes.
      </p>
      <button type="button" class="btn-primary mt-1" @click="cbtStore.handleNewEntry">
        Start a thought record
      </button>
    </div>

    <section v-for="group in groupedEntries" :key="group.key" class="pt-1">
      <h2 class="day-label pt-1">{{ group.heading }}</h2>
      <button
        v-for="entry in group.entries"
        :key="entry.id"
        type="button"
        class="flex w-full items-start gap-3.5 border-b border-rule py-3.5 text-left last:border-b-0"
        @click="cbtStore.handleViewEntry(entry)"
      >
        <span
          v-if="style !== 'workbook'"
          class="grid size-10 shrink-0 place-items-center rounded-full bg-sky-tint text-pen"
        >
          <LightBulbIcon v-if="style === 'companion'" class="size-[22px]" aria-hidden="true" />
          <SunIcon v-else class="size-[22px]" aria-hidden="true" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="line-clamp-2 block text-[17px] font-semibold leading-[25px]">
            <span
              :class="{ 'bg-sun px-1 text-sun-on [box-decoration-break:clone]': style === 'workbook' }"
              >{{ entry.beliefs }}</span
            >
          </span>
          <span
            class="mt-0.5 block truncate text-[15px]"
            :class="style === 'workbook' ? 'text-pen' : 'text-ink-2'"
          >
            {{ entry.disputes }}
          </span>
        </span>
        <span class="shrink-0 pt-0.5 text-[13px] text-ink-3">
          {{ formatTime(entry.createdAt.toDate()) }}
        </span>
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { LightBulbIcon, PlusIcon, SunIcon } from "@heroicons/vue/24/outline";
import type { CBTEntry } from "@/types/cbt";

const { entries } = defineProps<{
  entries: CBTEntry[];
}>();

const cbtStore = useCBTStore();
const { style } = useAppStyle();

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();

// Group by the local calendar day, newest first.
const groupedEntries = computed(() => {
  const sorted = [...entries].sort(
    (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
  );
  const groups: { key: string; heading: string; entries: CBTEntry[] }[] = [];
  for (const entry of sorted) {
    const date = entry.createdAt.toDate();
    const key = date.toDateString();
    const last = groups[groups.length - 1];
    if (last?.key === key) last.entries.push(entry);
    else groups.push({ key, heading: formatDayHeading(date), entries: [entry] });
  }
  return groups;
});
</script>
