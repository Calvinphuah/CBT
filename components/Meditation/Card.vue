<template>
  <button
    type="button"
    class="flex w-full items-center gap-3.5 border-b border-rule py-3.5 text-left last:border-b-0"
    @click="emit('openModal', card)"
  >
    <span
      class="row-icon grid size-10 shrink-0 place-items-center rounded-full bg-surface text-pen ring-[1.5px] ring-inset ring-pen/40"
    >
      <PlayIcon class="size-[18px]" aria-hidden="true" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-[17px] font-semibold">
        {{ card.title }}
        <HeartIcon
          v-if="isFavorite"
          class="ml-1 inline size-4 align-[-2px] text-danger"
          aria-label="Favourite"
        />
      </span>
      <span class="block truncate text-[15px] text-ink-3">{{ card.description }}</span>
    </span>
    <span class="shrink-0 text-[15px] font-semibold tabular-nums text-ink-2">
      {{ card.time.replace("mins", "min") }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { HeartIcon, PlayIcon } from "@heroicons/vue/24/solid";

interface Card {
  id: string;
  title: string;
  description: string;
  time: string;
}

const { card, isFavorite = false } = defineProps<{
  card: Card;
  isFavorite?: boolean;
}>();

const emit = defineEmits(["openModal"]);
</script>
