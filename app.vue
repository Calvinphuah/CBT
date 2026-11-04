<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Applies the saved light, dark or system theme as soon as the app mounts.
useColorMode();

// The chosen style (Clearing, Workbook or Companion) drives the colour tokens.
const { style } = useAppStyle();
useHead({ htmlAttrs: { "data-style": style } });
</script>
