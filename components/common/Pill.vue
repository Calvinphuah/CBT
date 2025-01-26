<template>
  <div class="px-2 py-1 text-xs font-semibold bg-white rounded-full shrink-0">
    {{ time }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ time: string }>();
</script>

<style scoped></style>
