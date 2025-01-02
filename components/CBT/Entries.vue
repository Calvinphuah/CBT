<!-- components/CBTEntries.vue -->
<template>
  <div class="">
    <!-- Grouped Entries by Date -->
    <div v-for="(group, date) in sortedGroupedEntries" :key="date" class="pt-4">
      <!-- Date Header -->
      <div class="px-4 pb-2 text-gray-800">
        {{ formatDate(new Date(date)) }}
      </div>

      <!-- Entries for the Date -->
      <div
        v-for="entry in group"
        :key="entry.id"
        class="flex items-center justify-between px-4 py-2 bg-white hover:cursor-pointer"
        @click="cbtStore.handleUpdateEntry(entry)"
      >
        <div>
          <div class="mb-1 text-sm text-blue-500">
            {{ formatFirestoreTimestampTime(entry.createdAt) }}
          </div>
          <h3 class="mb-1 text-l">
            {{ truncateText(entry.activatingEvent, 5) }}
          </h3>
          <p class="text-gray-600 text-m">
            {{ truncateText(entry.disputes, 10) }}
          </p>
        </div>
        <ChevronRightIcon class="size-7" />
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
