<template>
  <div>
    <CBTForm
      v-if="cbtStore.isEditing || cbtStore.isNewEntry"
      @saved="handleSaved"
    />

    <CBTSaved
      v-else-if="savedClearerView"
      :clearer-view="savedClearerView"
      @done="savedClearerView = ''"
      @view="viewSavedEntry"
    />

    <CBTRecord v-else-if="cbtStore.isViewing" />

    <CBTEntries v-else :entries="cbtStore.cbtEntries" />
  </div>
</template>

<script setup lang="ts">
const cbtStore = useCBTStore();

// Shown once, right after a new record is saved.
const savedClearerView = ref("");

const handleSaved = (clearerView: string) => {
  savedClearerView.value = clearerView;
};

const viewSavedEntry = () => {
  savedClearerView.value = "";
  const newest = cbtStore.cbtEntries[0];
  if (newest) cbtStore.handleViewEntry(newest);
};

onMounted(() => {
  cbtStore.fetchEntries();
});
</script>
