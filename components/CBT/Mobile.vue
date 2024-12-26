<template>
  <div>
    <MobileTopNav />
    <div v-if="selectedEntry">
      <!-- Detailed View -->
      <!-- <CBTEntryDetail :entry="selectedEntry" @close="closeDetail" /> -->
    </div>
    <div v-else-if="isNewEntry">
      <!-- New Entry View -->
      <CBTNewEntry @save="saveNewEntry" @cancel="cancelNewEntry" />
    </div>
    <div v-else>
      <!-- List View -->
      <CBTEntries
        :entries="entries"
        @select="selectEntry"
        @new="createNewEntry"
      />
    </div>
    <MobileBottomNav />
  </div>
</template>

<script setup>
// List of existing entries
const entries = ref([
  {
    id: 1,
    date: new Date("2024-12-25T10:00:00"),
    time: "10:00 PM",
    title: "Entry 1",
    description: "Description 1",
  },
  {
    id: 2,
    date: new Date("2024-12-25T12:00:00"),
    time: "12:00 AM",
    title: "Entry 2",
    description: "Description 2",
  },
  {
    id: 3,
    date: new Date("2025-12-25T10:00:00"),
    time: "10:00 PM",
    title: "Entry 3",
    description: "Description 3",
  },
]);

const selectedEntry = ref(null);
const isNewEntry = ref(true);

// Select an existing entry for detail view
const selectEntry = (entry) => {
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
const saveNewEntry = (newEntry) => {
  entries.value.push({
    id: entries.value.length + 1,
    ...newEntry,
  });
  isNewEntry.value = false;
};
</script>
