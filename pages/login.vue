<template>
  <div class="flex min-h-screen flex-wrap-reverse md:flex-row">
    <!-- Left Side (Bottom on small screens) -->
    <div class="w-full md:w-1/2 order-1">
      <LoginLeftSide />
    </div>
    <!-- Right Side (Top on small screens) -->
    <div class="w-full md:w-1/2 order-2">
      <LoginRightSide />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<style scoped></style>
