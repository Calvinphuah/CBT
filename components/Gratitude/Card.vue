<template>
  <button
    type="button"
    class="card flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-sunken"
    @click="$emit('click')"
  >
    <span
      class="row-icon grid size-10 shrink-0 place-items-center rounded-full bg-sky-tint text-sun-icon"
    >
      <HeartIcon v-if="style === 'companion' || style === 'margin'" class="size-5" aria-hidden="true" />
      <SunIcon v-else class="size-[22px]" aria-hidden="true" />
    </span>
    <span class="min-w-0 flex-1 text-[17px] leading-[25px]">{{ content }}</span>
    <span v-if="time" class="shrink-0 text-[13px] tabular-nums text-ink-3">{{ time }}</span>
  </button>
</template>

<script setup lang="ts">
import { HeartIcon, SunIcon } from "@heroicons/vue/24/outline";

defineProps<{
  content: string;
  time?: string;
}>();

defineEmits<{
  click: [];
}>();

const { style } = useAppStyle();
</script>
