<template>
  <button
    type="button"
    class="card flex w-full gap-3 px-4 py-3.5 text-left transition-colors hover:bg-sunken"
    @click="$emit('click')"
  >
    <SunIcon class="size-[22px] shrink-0 text-sun-icon" aria-hidden="true" />
    <span class="text-[17px] leading-[25px]">{{ content }}</span>
  </button>
</template>

<script setup lang="ts">
import { SunIcon } from "@heroicons/vue/24/outline";

defineProps<{
  content: string;
}>();

defineEmits<{
  click: [];
}>();
</script>
