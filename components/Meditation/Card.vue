<template>
  <div class="max-w-lg mx-auto mb-4">
    <div
      class="transition-transform transform bg-white border border-black rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
    >
      <button
        class="flex items-center justify-between w-full text-left"
        @click="emit('openModal', card)"
      >
        <!-- Icon Section -->
        <div class="flex">
          <!-- <div class="w-24 rounded-l-lg bg-accent-blue">hey</div> -->
          <!-- Text Section -->
          <div class="flex flex-col py-4 ml-4">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ card.title }}
            </h3>
            <p class="text-sm text-gray-600">{{ card.description }}</p>
          </div>
        </div>

        <!-- Time Section -->
        <div
          class="flex flex-col items-center justify-center p-4 text-gray-500"
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
