<template>
  <div class="max-w-lg pb-32 mx-auto">
    <!-- Title -->
    <div class="flex items-center justify-between px-10 py-4">
      <img src="../../public/img/landing-cbt.png" alt="CBT" class="w-32" />
      <h2 class="text-lg font-semibold">
        <span class="block md:inline">Challenge your</span>
        <span class="block md:inline"> negative thoughts</span>
      </h2>
    </div>

    <!-- Grouped Entries by Date -->
    <div
      v-for="(group, date) in sortedGroupedEntries"
      :key="date"
      class="px-4 pt-4"
    >
      <!-- Date Header -->
      <h2 class="px-2 pb-2 text-lg font-medium text-gray-800">
        {{ formatDate(new Date(date)) }}
      </h2>

      <!-- Entries for the Date -->
      <div
        v-for="(entry, index) in group"
        :key="entry.id"
        :class="[
          'flex items-center gap-2 p-6  rounded-lg hover:cursor-pointer bg-accent-orange',
          index < group.length - 1 ? 'mb-4' : '',
        ]"
        @click="cbtStore.handleViewEntry(entry)"
      >
        <!-- Left Side -->
        <div class="w-full">
          <div class="flex items-center justify-between mb-2">
            <!-- Title -->
            <h3 class="text-base font-semibold">
              {{ truncateText(entry.activatingEvent, 30) }}
            </h3>
            <!-- Time -->
            <CommonPill :time="formatFirestoreTimestampTime(entry.createdAt)" />
          </div>
          <div>
            <!-- Content -->
            <p class="text-sm text-gray-600">
              {{ truncateText(entry.disputes, 50) }}
            </p>
          </div>
        </div>
        <!-- Right Side -->
        <div>
          <ChevronRightIcon class="size-7" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
import type { CBTEntry } from "@/types/cbt";

const props = defineProps<{
  entries: CBTEntry[];
}>();

const cbtStore = useCBTStore();

// Group entries by date
const groupedEntries = computed(() => {
  return props.entries.reduce((acc, entry) => {
    // Convert Firestore Timestamp to Date
    const createdAt = entry.createdAt.toDate();
    const dateOnly = createdAt.toISOString().split("T")[0];

    // Group by date
    if (!acc[dateOnly]) {
      acc[dateOnly] = [];
    }
    acc[dateOnly].push({ ...entry });
    return acc;
  }, {} as Record<string, CBTEntry[]>);
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
      acc[date] = group.sort((a, b) => {
        const dateA = a.createdAt.toDate();
        const dateB = b.createdAt.toDate();
        return dateB.getTime() - dateA.getTime();
      });
      return acc;
    }, {} as Record<string, CBTEntry[]>);

  return sorted;
});
</script>
