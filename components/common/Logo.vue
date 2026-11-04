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

    <template v-else>
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
    </template>
  </NuxtLink>
</template>

<script setup lang="ts">
const { size = "md" } = defineProps<{ size?: "md" | "lg" }>();

const { style } = useAppStyle();

const markSize = computed(() => (size === "lg" ? 32 : 28));
const wordSize = computed(() => (size === "lg" ? 26 : 22));
</script>
