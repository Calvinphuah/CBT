<template>
  <NuxtLink to="/" class="inline-flex min-h-11 items-center gap-2" aria-label="Cogni home">
    <template v-if="style === 'margin'">
      <!-- The margin mark: a bracket (the thought) with a note beside it. -->
      <svg :width="markSize - 4" :height="markSize - 4" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14 3H6v18h8"
          fill="none"
          class="stroke-btn"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="15" cy="13.5" r="3" class="fill-pen" />
      </svg>
      <span
        class="font-display font-bold tracking-[-0.02em] text-ink"
        :style="{ fontSize: `${wordSize}px` }"
        >cogni</span
      >
    </template>

    <template v-else>
      <!-- Same mark as the app icon: a c whose curve opens into a straight line. -->
      <svg :width="markSize" :height="markSize" viewBox="0 0 512 512" aria-hidden="true">
        <rect width="512" height="512" rx="112" class="fill-pen" />
        <path
          d="M316 178A116 116 0 1 0 226 372H398"
          fill="none"
          class="stroke-page"
          stroke-width="52"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        class="font-display font-extrabold tracking-[-0.04em] text-ink"
        :style="{ fontSize: `${wordSize}px` }"
        >cogni</span
      >
    </template>
  </NuxtLink>
</template>

<script setup lang="ts">
const { size = "md" } = defineProps<{ size?: "md" | "lg" }>();

const { style } = useAppStyle();

const markSize = computed(() => (size === "lg" ? 32 : 28));
const wordSize = computed(() => (size === "lg" ? 26 : 22));
</script>
