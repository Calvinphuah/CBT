<template>
  <div>
    <CBTTopNav />

    <CBTForm
      v-if="cbtStore.isEditing || cbtStore.isNewEntry || cbtStore.isViewing"
    />

    <CBTEntries v-else :entries="cbtStore.cbtEntries" />

    <!-- <MobileBottomNav /> -->
  </div>
</template>

<script setup lang="ts">
const cbtStore = useCBTStore();

onMounted(() => {
  cbtStore.fetchEntries();
});
</script>
