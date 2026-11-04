<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Applies the saved light, dark or system theme as soon as the app mounts.
useColorMode();
</script>
