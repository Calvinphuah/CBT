<template>
  <div class="flex flex-col gap-1">
    <div class="flex h-11 items-center justify-between gap-3">
      <button
        type="button"
        class="icon-btn -ml-2.5"
        :aria-label="isEditing ? 'Stop editing' : 'Close'"
        @click="emit('close')"
      >
        <XMarkIcon class="size-6" aria-hidden="true" />
      </button>

      <p
        class="text-[15px] font-semibold text-ink-2"
        :class="{ 'sr-only': style === 'workbook' || style === 'companion' }"
        aria-live="polite"
      >
        {{ isEditing ? "Editing" : "New record" }}, step {{ step }} of {{ total }}
      </p>

      <ol v-if="style === 'workbook'" class="flex gap-1.5" aria-hidden="true">
        <li
          v-for="(tab, index) in WORKBOOK_TABS"
          :key="tab.letter"
          class="flex w-[52px] flex-col items-center rounded py-1 ring-[1.5px] ring-inset ring-line"
          :class="workbookTabClass(index + 1)"
        >
          <span class="text-[14px] font-extrabold leading-4">{{ tab.letter }}</span>
          <span class="text-[11px] font-medium leading-3">{{ tab.label }}</span>
        </li>
      </ol>

      <ol v-else-if="style === 'companion'" class="flex items-center gap-1.5" aria-hidden="true">
        <li
          v-for="index in total"
          :key="index"
          class="h-2.5 rounded-full transition-all"
          :class="
            index === step ? 'w-7 bg-sun' : index < step ? 'w-2.5 bg-storm dark:bg-storm-label' : 'w-2.5 bg-rule'
          "
        />
      </ol>

      <span class="size-11" aria-hidden="true" />
    </div>

    <div
      v-if="style === 'clearing' || style === 'margin'"
      class="grid gap-[5px]"
      :style="{ gridTemplateColumns: `repeat(${total}, 1fr)` }"
    >
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

const { style } = useAppStyle();

const WORKBOOK_TABS = [
  { letter: "A", label: "Event" },
  { letter: "B", label: "Thought" },
  { letter: "C", label: "Feeling" },
  { letter: "D", label: "Answer" },
];

// The sun (Margin: the green second ink) only appears on the last step, when the thought gets reframed.
const segmentClass = (index: number) => {
  if (index > step) return "bg-rule";
  if (index === total) return "bg-sun";
  return style.value === "margin" ? "bg-btn" : "bg-storm dark:bg-sky";
};

const workbookTabClass = (index: number) => {
  if (index === step) return "bg-sun text-sun-on";
  if (index < step) return "bg-line text-page dark:text-ink";
  return "bg-surface text-ink";
};
</script>
