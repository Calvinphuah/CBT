<template>
  <div class="max-w-lg pb-32 mx-auto">
    <!-- Title -->
    <div class="flex items-center justify-between px-10 py-4">
      <img
        src="../../public/img/landing-gratitude.png"
        alt="Gratitude"
        class="w-32"
      />
      <h2 class="text-lg font-semibold">Capture moments of <br />gratitude</h2>
    </div>

    <!-- Modals -->
    <GratitudeNewEntryModal v-if="gratitudeStore.isNewEntry" />
    <GratitudeEditEntryModal v-if="gratitudeStore.isEditing" />

    <!-- Main Content -->
    <div class="px-4 space-y-6">
      <!-- Empty State -->
      <div
        v-if="
          !gratitudeStore.gratitudeEntries.length && !gratitudeStore.loading
        "
        class="py-10 text-center"
      >
        <p class="text-gray-500">
          No entries yet. Start capturing moments of gratitude!
        </p>
      </div>

      <!-- Entries List -->
      <div v-else>
        <!-- Grouped Entries by Date -->
        <div
          v-for="(group, date) in sortedGroupedEntries"
          :key="date"
          class="mb-4"
        >
          <!-- Date Header -->
          <h2 class="px-2 pb-2 text-lg font-medium text-gray-800">
            {{ formatDate(new Date(date)) }}
          </h2>

          <!-- Entries for the Date -->
          <div class="space-y-3">
            <GratitudeCard
              v-for="entry in group"
              :key="entry.id"
              :content="entry.entry"
              :image="entry.image"
              @click="gratitudeStore.handleEditEntry(entry)"
            />
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="gratitudeStore.loading" class="flex justify-center p-4">
          <div
            class="w-8 h-8 border-t-2 border-b-2 rounded-full border-primary animate-spin"
          ></div>
        </div>

        <!-- Infinite Scroll Sentinel -->
        <div v-if="!gratitudeStore.allLoaded" ref="sentinel" class="h-4"></div>

        <!-- All Loaded Message -->
        <div
          v-if="gratitudeStore.allLoaded"
          class="p-4 text-center text-gray-500"
        >
          All entries loaded
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GratitudeEntry } from "@/types/gratitude";

const gratitudeStore = useGratitudeStore();
const sentinel = ref<HTMLElement | null>(null);

// Format date to match the design
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Group entries by date
const groupedEntries = computed(() => {
  return gratitudeStore.gratitudeEntries.reduce((acc, entry) => {
    // Convert Firestore Timestamp to Date
    const createdAt = entry.createdAt.toDate();
    const dateOnly = createdAt.toISOString().split("T")[0];

    if (!acc[dateOnly]) {
      acc[dateOnly] = [];
    }
    acc[dateOnly].push(entry);
    return acc;
  }, {} as Record<string, GratitudeEntry[]>);
});

// Sort grouped entries by date and time
const sortedGroupedEntries = computed(() => {
  const sorted = Object.entries(groupedEntries.value)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime()
    )
    .reduce((acc, [date, group]) => {
      // Sort entries within each group by time
      acc[date] = group.sort(
        (a, b) =>
          b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
      );
      return acc;
    }, {} as Record<string, GratitudeEntry[]>);

  return sorted;
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

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }

  // Initial load
  gratitudeStore.fetchEntries();

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
