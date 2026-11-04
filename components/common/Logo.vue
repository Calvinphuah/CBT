<template>
  <NuxtLink to="/" class="inline-flex items-center gap-2" aria-label="Cogni home">
    <svg :width="markSize" :height="markSize" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 19a11 11 0 0 1 22 0z" class="fill-sun" />
      <rect
        x="2"
        y="20.5"
        width="28"
        height="3.5"
        rx="1.75"
        class="fill-storm dark:fill-sky"
      />
    </svg>
    <span
      class="font-display font-extrabold tracking-[-0.04em] text-ink"
      :style="{ fontSize: `${wordSize}px` }"
      >cogni</span
    >
  </NuxtLink>
</template>

<script setup lang="ts">
const { size = "md" } = defineProps<{ size?: "md" | "lg" }>();

const markSize = computed(() => (size === "lg" ? 32 : 28));
const wordSize = computed(() => (size === "lg" ? 26 : 22));
</script>
