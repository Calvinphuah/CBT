<template>
  <div class="max-w-lg mx-auto space-y-6">
    <div
      class="transition-transform transform bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
    >
      <button
        class="flex items-center justify-between w-full p-4 text-left"
        @click="emit('openModal', card)"
      >
        <!-- Text Section -->
        <div class="flex flex-col">
          <h3 class="text-lg font-semibold text-gray-800">{{ card.title }}</h3>
          <p class="text-sm text-gray-600">{{ card.description }}</p>
        </div>

        <!-- Time Section -->
        <div
          class="flex flex-col items-center justify-center ml-6 text-gray-500"
        >
          <span class="text-2xl font-bold text-gray-800">{{
            card.time.split(" ")[0]
          }}</span>
          <span class="text-sm">mins</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Card {
  id: string;
  title: string;
  description: string;
  time: string;
}

const { card } = defineProps<{
  card: Card;
}>();

const emit = defineEmits(["openModal"]);
</script>
