<template>
  <div>
    <CBTTopNav />
    <div v-if="selectedEntry">
      <!-- Detailed View -->
      <!-- <CBTEntryDetail :entry="selectedEntry" @close="closeDetail" /> -->
    </div>
    <div v-else-if="isNewEntry">
      <!-- New Entry View -->
      <CBTNewEntry @cancel="cancelNewEntry" />
    </div>
    <div v-else>
      <!-- List View -->
      <CBTEntries
        :entries="cbtStore.cbtEntries"
        @select="selectEntry"
        @new="createNewEntry"
      />
    </div>
    <MobileBottomNav />
  </div>
</template>

<script setup lang="ts">
import type { CBTEntry } from "~/types/cbt";

const selectedEntry = ref<CBTEntry | null>(null);
const isNewEntry = ref(false);

// Select an existing entry for detail view
const selectEntry = (entry: CBTEntry) => {
  selectedEntry.value = entry;
};

// Close the detail view
// const closeDetail = () => {
//   selectedEntry.value = null;
// };

// Open the new entry view
const createNewEntry = () => {
  isNewEntry.value = true;
};

// Cancel the new entry view
const cancelNewEntry = () => {
  isNewEntry.value = false;
};

// Save the new entry
// const saveNewEntry = (newEntry: Omit<CBTEntry, "id" | "createdAt">) => {
//   entries.value.push({
//     ...newEntry,
//     id: String(entries.value.length + 1),
//     createdAt: new Date(),
//   });
//   isNewEntry.value = false;
// };

const cbtStore = useCBTStore();

onMounted(() => {
  cbtStore.fetchEntries();
});
</script>
