<template>
  <div class="flex flex-col gap-1">
    <div class="flex h-11 items-center justify-between">
      <button
        type="button"
        class="icon-btn -ml-2.5"
        :aria-label="isEditing ? 'Stop editing' : 'Close'"
        @click="emit('close')"
      >
        <XMarkIcon class="size-6" aria-hidden="true" />
      </button>
      <p class="text-[15px] font-semibold text-ink-2" aria-live="polite">
        {{ isEditing ? "Editing" : "New record" }}, step {{ step }} of {{ total }}
      </p>
      <span class="size-11" aria-hidden="true" />
    </div>
    <div class="grid gap-[5px]" :style="{ gridTemplateColumns: `repeat(${total}, 1fr)` }">
      <i
        v-for="index in total"
        :key="index"
        class="h-1 rounded-full"
        :class="segmentClass(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

const { step, total, isEditing = false } = defineProps<{
  step: number;
  total: number;
  isEditing?: boolean;
}>();

const emit = defineEmits<{ (e: "close"): void }>();

// The sun only appears on the last step, when the thought gets reframed.
const segmentClass = (index: number) => {
  if (index > step) return "bg-rule";
  if (index === total) return "bg-sun";
  return "bg-storm dark:bg-sky";
};
</script>
