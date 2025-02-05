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
    <div v-if="Object.keys(sortedGroupedEntries).length > 0">
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
          v-for="entry in group"
          :key="entry.id"
          class="relative mb-4 overflow-hidden transition-transform transform bg-white border border-black rounded-lg shadow-md hover:cursor-pointer hover:scale-105 hover:shadow-lg"
          @click="cbtStore.handleViewEntry(entry)"
        >
          <div class="flex items-center justify-between p-6 pr-12">
            <!-- Left Side -->
            <div class="w-full min-w-0">
              <div class="flex items-center justify-between mb-2">
                <!-- Title -->
                <h3 class="pr-2 text-base font-semibold truncate">
                  {{ entry.activatingEvent }}
                </h3>
                <!-- Time -->
                <CommonPill
                  :time="formatFirestoreTimestampTime(entry.createdAt)"
                  :bg-color="'bg-accent-orange'"
                />
              </div>
              <div>
                <!-- Content -->
                <p class="text-sm text-gray-600 truncate">
                  {{ entry.disputes }}
                </p>
              </div>
            </div>
          </div>

          <!-- Chevron - Absolutely positioned within the container -->
          <div class="absolute transform -translate-y-1/2 top-1/2 right-4">
            <ChevronRightIcon class="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
    <p v-else class="px-4 pt-4 text-center text-gray-600">
      No entries yet. Add some!
    </p>
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
    const createdAt = entry.createdAt.toDate();
    const dateOnly = createdAt.toISOString().split("T")[0];

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
