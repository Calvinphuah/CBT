<template>
  <div>
    <CBTForm v-if="cbtStore.isEditing || cbtStore.isNewEntry" />

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
const route = useRoute();

// Set by CBTForm when a new record is saved; shown once, then cleared.
const savedClearerView = useState("cbt-saved-clearer-view", () => "");

const viewSavedEntry = () => {
  savedClearerView.value = "";
  const newest = cbtStore.cbtEntries[0];
  if (newest) cbtStore.handleViewEntry(newest);
};

// Leaving the page dismisses the saved screen, so it isn't shown again on return.
onUnmounted(() => {
  savedClearerView.value = "";
});

onMounted(() => {
  cbtStore.fetchEntries();

  // The installed app's "New thought record" shortcut opens /cbt?new=1.
  if (route.query.new) {
    cbtStore.handleNewEntry();
    navigateTo("/cbt", { replace: true });
  }
});
</script>
