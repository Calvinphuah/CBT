<template>
  <div>
    <VitePwaManifest />
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Applies the saved light, dark or system theme as soon as the app mounts.
const colorMode = useColorMode();

// The chosen style (Clearing, Workbook or Companion) drives the colour tokens.
const { style } = useAppStyle();

// Browser and installed-app top bar follow the page colour of the active style.
const PAGE_COLORS = {
  clearing: { light: "#F5F7FA", dark: "#11151D" },
  workbook: { light: "#FBFBF8", dark: "#141417" },
  companion: { light: "#FBF8FF", dark: "#17132A" },
};
const themeColor = computed(
  () => PAGE_COLORS[style.value][colorMode.value === "dark" ? "dark" : "light"]
);

useHead({
  htmlAttrs: { "data-style": style },
  meta: [{ name: "theme-color", content: themeColor }],
});
</script>
