<template>
  <div class="flex min-h-[calc(100dvh-6rem)] flex-col md:min-h-screen md:items-center md:justify-center md:p-10">
    <div class="flex w-full flex-1 flex-col md:max-w-[640px] md:flex-none">
      <div class="art-frame art-flat h-[46vh] max-h-[400px] overflow-hidden rounded-b-[36px] md:h-[300px] md:rounded-[28px]">
        <CommonIllustration :position="style === 'clearing' ? '50% 38%' : undefined" />
      </div>

      <div class="flex flex-1 flex-col gap-4 px-5 pt-7 md:px-0">
        <h1 class="text-display">{{ copy.savedTitle }}</h1>
        <div class="clear-card">
          <p class="card-label text-ink-2">
            <SunIcon v-if="style === 'clearing'" class="size-4 text-ink" aria-hidden="true" />
            {{ copy.answerLabel }}
          </p>
          <p class="text-[17px] font-medium leading-[25px]">{{ clearerView }}</p>
        </div>
        <div class="flex-1" />
        <button type="button" class="btn-primary w-full" @click="emit('done')">Done</button>
        <button
          type="button"
          class="mb-4 h-11 text-[15px] font-semibold"
          @click="emit('view')"
        >
          View the full record
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SunIcon } from "@heroicons/vue/24/outline";

const { clearerView } = defineProps<{ clearerView: string }>();
const emit = defineEmits<{ (e: "done" | "view"): void }>();

const { style, copy } = useAppStyle();
</script>
