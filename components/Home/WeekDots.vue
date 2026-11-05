<template>
  <ol class="flex gap-[7px]" aria-label="Days this week with a thought record">
    <li
      v-for="(hasEntry, index) in weekDays"
      :key="index"
      class="flex flex-col items-center gap-1 text-[11px] font-semibold text-ink-3"
    >
      <span
        class="block size-3.5 rounded-full"
        :class="hasEntry ? 'bg-sun ring-[1.5px] ring-inset ring-pen' : 'ring-[1.5px] ring-inset ring-ink-3/75'"
      />
      <span aria-hidden="true">{{ DAY_LETTERS[index] }}</span>
      <span class="sr-only">{{ DAY_NAMES[index] }}: {{ hasEntry ? "record written" : "none" }}</span>
    </li>
  </ol>
</template>

<script setup lang="ts">
defineProps<{ weekDays: boolean[] }>();

const DAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
</script>
