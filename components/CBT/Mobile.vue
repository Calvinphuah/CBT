<template>
  <div>
    <CBTTopNav
      :show-back-button="isNewEntry || selectedEntry"
      @back="handleBack"
      @new="handleNewEntry"
    />

    <CBTForm
      v-if="isNewEntry || selectedEntry"
      :entry="selectedEntry"
      @save="handleSave"
      @cancel="handleBack"
    />

    <CBTEntries
      v-else
      :entries="cbtStore.cbtEntries"
      @select="handleEntrySelect"
      @new="handleNewEntry"
    />

    <MobileBottomNav />
  </div>
</template>

<script setup lang="ts">
import type { CBTEntry } from "~/types/cbt";

const cbtStore = useCBTStore();
const isNewEntry = ref(false);
const selectedEntry = ref<CBTEntry | null>(null);

onMounted(() => {
  cbtStore.fetchEntries();
});

// Navigation handlers
const handleNewEntry = () => {
  selectedEntry.value = null;
  isNewEntry.value = true;
  cbtStore.resetForm();
};

const handleBack = () => {
  selectedEntry.value = null;
  isNewEntry.value = false;
  cbtStore.resetForm();
};

const handleEntrySelect = (entry: CBTEntry) => {
  selectedEntry.value = entry;
  isNewEntry.value = false;
  // Populate form with entry data
  cbtStore.formData = {
    activating: entry.activatingEvent,
    beliefs: entry.beliefs,
    consequentFeelings: entry.consequentFeelings,
    dispute: entry.disputes,
  };
};

const handleSave = async () => {
  try {
    if (selectedEntry.value) {
      await cbtStore.updateEntry(selectedEntry.value.id, {
        activatingEvent: cbtStore.formData.activating,
        beliefs: cbtStore.formData.beliefs,
        consequentFeelings: cbtStore.formData.consequentFeelings,
        disputes: cbtStore.formData.dispute,
      });
    } else {
      await cbtStore.submitCurrentEntry();
    }
    handleBack();
  } catch (error) {
    console.error("Error saving entry:", error);
  }
};
</script>
