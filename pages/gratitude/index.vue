<template>
  <div class="flex flex-col h-screen">
    <GratitudeTopNav />
    <div class="flex-1 overflow-hidden">
      <GratitudeList />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });
</script>
