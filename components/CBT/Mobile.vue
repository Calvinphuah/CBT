<template>
  <div>
    {{ cbtStore.isEditing }}
    {{ cbtStore.isNewEntry }}

    <CBTTopNav />

    <CBTForm v-if="cbtStore.isEditing || cbtStore.isNewEntry" />

    <CBTEntries v-else :entries="cbtStore.cbtEntries" />

    <MobileBottomNav />
  </div>
</template>

<script setup lang="ts">
const cbtStore = useCBTStore();

onMounted(() => {
  cbtStore.fetchEntries();
});
</script>
