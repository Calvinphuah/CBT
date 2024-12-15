<template>
  <div>
    <div v-if="testStore.loading">Loading...</div>
    <div v-else-if="testStore.error">{{ testStore.error }}</div>
    <div v-else>
      <div v-for="item in testStore.data" :key="item.id">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const testStore = useTestStore();
let unsubscribe;

onMounted(async () => {
  unsubscribe = await testStore.getAllData();
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>
