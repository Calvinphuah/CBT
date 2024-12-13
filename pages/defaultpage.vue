<template>
  <div>
    <div>{{ user }}</div>
    <div>{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthStore();
const { data } = useDataStore();
definePageMeta({
  middleware: ["guest"],
});
</script>
