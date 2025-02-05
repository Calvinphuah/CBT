<template>
  <div class="flex flex-col">
    <GratitudeTopNav />
    <div class="flex-1 overflow-hidden">
      <GratitudeList />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Gratitude",
});
</script>
