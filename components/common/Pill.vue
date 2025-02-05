<template>
  <div
    class="px-2 py-1 text-xs font-semibold rounded-full shrink-0"
    :class="bgColor ? bgColor : 'bg-white'"
  >
    {{ time }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ time: string; bgColor?: string }>();
</script>

<style scoped></style>
