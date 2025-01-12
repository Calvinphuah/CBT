<template>
  <div class="max-w-md mx-auto mb-10 space-y-4">
    <!-- <h2 class="mb-4 text-lg font-semibold">for you today</h2> -->

    <div
      v-for="(card, index) in cards"
      :key="index"
      class="overflow-hidden border border-gray-100 shadow-sm cursor-pointer rounded-xl"
    >
      <NuxtLink :to="card.link">
        <!-- White header section -->
        <div class="flex items-center justify-between p-4 bg-white">
          <span class="font-medium text-gray-800">{{ card.title }}</span>
          <!-- <div class="inline-block px-2 py-1 bg-gray-600 rounded-full">
          </div> -->
          <span class="text-xs text-gray-800">{{ card.time }}</span>
        </div>

        <!-- Image content section -->
        <div
          class="relative p-4 min-h-[160px] bg-cover bg-center"
          :style="{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${card.image})`,
          }"
        >
          <div class="flex items-start justify-between">
            <p class="pr-4 text-sm text-white">{{ card.description }}</p>
            <span class="text-2xl">{{ card.icon }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    required: true,
    // default: () => [],
  },
});
</script>
