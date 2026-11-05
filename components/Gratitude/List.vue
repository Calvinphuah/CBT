<template>
  <div class="flex flex-col gap-2.5 pt-1">
    <GratitudeNewEntryModal />
    <GratitudeEditEntryModal />

    <CommonLoadError
      v-if="gratitudeStore.error && !gratitudeStore.gratitudeEntries.length"
      class="mt-2"
      what="bright spots"
      @retry="gratitudeStore.fetchEntries()"
    />

    <div
      v-else-if="!gratitudeStore.gratitudeEntries.length && !gratitudeStore.loading"
      class="clear-card mt-2 flex flex-col gap-3 p-5"
    >
      <SunIcon class="size-7 text-sun-icon" aria-hidden="true" />
      <h2 class="text-heading text-ink">Write your first bright spot</h2>
      <p class="text-[15px] leading-[21px] text-ink-2">
        One small good thing from today is enough. A warm drink, a kind word,
        a quiet minute.
      </p>
      <button type="button" class="btn-primary mt-1" @click="gratitudeStore.handleNewEntry">
        Add a bright spot
      </button>
    </div>

    <template v-else>
      <section
        v-for="group in groupedEntries"
        :key="group.key"
        class="flex flex-col gap-2.5"
      >
        <h2 class="day-label pt-2">{{ group.heading }}</h2>
        <GratitudeCard
          v-for="entry in group.entries"
          :key="entry.id"
          :content="entry.entry"
          :time="formatTime(entry.createdAt.toDate())"
          @click="gratitudeStore.handleEditEntry(entry)"
        />
      </section>

      <p v-if="gratitudeStore.loading" class="py-4 text-center text-[15px] text-ink-3">
        Loading&hellip;
      </p>

      <div v-if="!gratitudeStore.allLoaded" ref="sentinel" class="h-4"></div>

      <p
        v-if="gratitudeStore.allLoaded && gratitudeStore.gratitudeEntries.length"
        class="py-4 text-center text-[13px] text-ink-3"
      >
        That&rsquo;s everything so far.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { SunIcon } from "@heroicons/vue/24/outline";
import type { GratitudeEntry } from "@/types/gratitude";

const gratitudeStore = useGratitudeStore();
const sentinel = ref<HTMLElement | null>(null);

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();

// Group by the local calendar day, newest first.
const groupedEntries = computed(() => {
  const sorted = [...gratitudeStore.gratitudeEntries].sort(
    (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
  );
  const groups: { key: string; heading: string; entries: GratitudeEntry[] }[] = [];
  for (const entry of sorted) {
    const date = entry.createdAt.toDate();
    const key = date.toDateString();
    const last = groups[groups.length - 1];
    if (last?.key === key) last.entries.push(entry);
    else groups.push({ key, heading: formatDayHeading(date), entries: [entry] });
  }
  return groups;
});

// Setup intersection observer for infinite scroll
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !gratitudeStore.loading &&
        !gratitudeStore.allLoaded
      ) {
        gratitudeStore.fetchEntries(true);
      }
    },
    {
      rootMargin: "100px",
      threshold: 0.1,
    }
  );

  watch(
    sentinel,
    (el, previous) => {
      if (previous) observer.unobserve(previous);
      if (el) observer.observe(el);
    },
    { immediate: true }
  );

  // Initial load
  gratitudeStore.fetchEntries();

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
