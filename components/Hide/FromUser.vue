<!-- Wrapper to hide content from authenticated users -->
<template>
  <slot v-if="!authStore.user && authStore.initialAuthValueReady"></slot>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>
