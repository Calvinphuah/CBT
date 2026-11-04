<template>
  <NuxtLink to="/" class="inline-flex items-center gap-2" aria-label="Cogni home">
    <template v-if="style === 'workbook'">
      <span class="inline-flex flex-col">
        <span
          class="font-display font-extrabold leading-none tracking-[-0.04em] text-ink"
          :style="{ fontSize: `${wordSize + 2}px` }"
          >Cogni</span
        >
        <svg
          :width="wordSize * 3.2"
          :height="wordSize * 0.45"
          viewBox="0 0 84 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 8c12-6 22 4 34-1s22-6 30 0c4 3 10 2 16-2"
            class="stroke-pen"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </template>

    <template v-else-if="style === 'companion'">
      <svg :width="markSize" :height="markSize" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="11" class="fill-storm" />
        <ellipse cx="11.5" cy="14" rx="2.6" ry="3.4" class="fill-storm-on" />
        <ellipse cx="20.5" cy="14" rx="2.6" ry="3.4" class="fill-storm-on" />
        <ellipse cx="16" cy="22" rx="3" ry="1.6" class="fill-sun" />
      </svg>
      <span
        class="font-display font-extrabold tracking-[-0.03em] text-ink"
        :style="{ fontSize: `${wordSize + 2}px` }"
        >cogni</span
      >
    </template>

    <template v-else-if="style === 'margin'">
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
      <!-- Same thought bubble with a sunrise as the app icon, cropped to the bubble. -->
      <svg :width="markSize" :height="markSize" viewBox="106 116 308 308" aria-hidden="true">
        <g class="fill-storm dark:fill-sky">
          <circle cx="190" cy="236" r="62" />
          <circle cx="262" cy="196" r="74" />
          <circle cx="334" cy="236" r="62" />
          <rect x="128" y="226" width="268" height="104" rx="52" />
          <circle cx="176" cy="372" r="18" />
          <circle cx="146" cy="408" r="11" />
        </g>
        <path d="M206 284a56 56 0 0 1 112 0z" class="fill-sun" />
        <rect x="186" y="292" width="152" height="14" rx="7" class="fill-page" />
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
