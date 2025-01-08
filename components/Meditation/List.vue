<template>
  <div>
    <BreathingCard
      v-for="item in meditationList"
      :key="item.title"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
const meditationList = [
  {
    title: "Bedtime relaxation 1",
    content: "To relax and be in bed",
  },
  {
    title: "Bedtime relaxation 2",
    content: "To relax and be in bed",
  },
  {
    title: "Bedtime relaxation 3",
    content: "To relax and be in bed",
  },
  {
    title: "Bedtime relaxation 4",
    content: "To relax and be in bed",
  },
];
</script>

<style scoped></style>
