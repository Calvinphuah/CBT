<!-- components/CBTEntries.vue -->
<template>
  <div class="">
    <!-- Grouped Entries by Date -->
    <div v-for="(group, date) in sortedGroupedEntries" :key="date" class="py-4">
      <!-- Date Header -->
      <div class="text-gray-600 pb-4 px-4">
        {{ formatDate(new Date(date)) }}
      </div>

      <!-- Entries for the Date -->
      <div
        v-for="entry in group"
        :key="entry.time + entry.title"
        class="flex items-center justify-between py-2 bg-red-300 px-4"
      >
        <div>
          <div class="text-blue-500 text-sm mb-1">{{ entry.time }}</div>
          <h3 class="text-l mb-1">{{ truncateText(entry.title, 5) }}</h3>
          <p class="text-gray-600 text-m">
            {{ truncateText(entry.description, 10) }}
          </p>
        </div>
        <ChevronRightIcon class="size-7" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
interface Entry {
  date: Date;
  time: string;
  title: string;
  description: string;
}

const props = defineProps<{
  entries: Entry[];
}>();

// Group entries by date
const groupedEntries = computed(() => {
  return props.entries.reduce((acc, entry) => {
    const dateKey = entry.date.toISOString(); // Use ISO string as key
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(entry);
    return acc;
  }, {} as Record<string, Entry[]>);
});

// Sort grouped entries by date in descending order
const sortedGroupedEntries = computed(() => {
  return Object.entries(groupedEntries.value)
    .sort(
      ([dateA], [dateB]) =>
        new Date(dateB).getTime() - new Date(dateA).getTime()
    )
    .reduce((acc, [date, group]) => {
      acc[date] = group;
      return acc;
    }, {} as Record<string, Entry[]>);
});
</script>
