<template>
  <div v-if="entry">
    {{ id }}
    <h1>Editing: {{ entry.activatingEvent }}</h1>
    <form @submit.prevent="saveEntry">
      <label>
        Activating Event:
        <input v-model="editableEntry.activatingEvent" />
      </label>
      <label>
        Beliefs:
        <input v-model="editableEntry.beliefs" />
      </label>
      <label>
        Consequent Feelings:
        <input v-model="editableEntry.consequentFeelings" />
      </label>
      <label>
        Disputes:
        <input v-model="editableEntry.disputes" />
      </label>
      <button type="submit">Save</button>
    </form>
  </div>
  <div v-else>
    <p>Loading entry...</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const cbtStore = useCBTStore();
const id = route.params.id as string;

// Get the entry from the store
const entry = computed(() => cbtStore.cbtEntries.find((e) => e.id === id));

// Redirect to 404 if entry is not found
// onMounted(() => {
//   if (!entry.value) {
//     router.push("/404"); // Redirect to a 404 page
//   }
// });

// Make a copy for editing
const editableEntry = ref({ ...entry.value });

const saveEntry = async () => {
  if (!editableEntry.value) return;

  try {
    await cbtStore.updateEntry(id, editableEntry.value);
    alert("Entry saved successfully!");
  } catch (error) {
    console.error("Error saving entry:", error);
  }
};
</script>
