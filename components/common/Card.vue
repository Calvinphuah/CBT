<template>
  <div class="max-w-md p-4 mx-auto space-y-4">
    <h2 class="mb-4 text-lg font-semibold">for you today</h2>

    <div
      v-for="(card, index) in cards"
      :key="index"
      class="overflow-hidden border border-gray-100 shadow-sm cursor-pointer rounded-xl"
    >
      <NuxtLink :to="card.link">
        <!-- White header section -->
        <div class="flex items-center justify-between p-4 bg-white">
          <span class="font-medium text-gray-800">{{ card.title }}</span>
          <span class="text-xs text-gray-500">{{ card.time }}</span>
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

          <div class="mt-3">
            <button
              class="p-2 transition-colors rounded-full bg-white/30 hover:bg-white/40"
            >
              <PlayIcon class="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </NuxtLink>
    </div>

    <MobileNav />
  </div>
</template>

<script setup>
import { PlayIcon } from "@heroicons/vue/24/solid";

defineProps({
  cards: {
    type: Array,
    required: true,
    default: () => [
      {
        title: "your morning meditation",
        description: "an exclusive meditation each day for you!",
        image:
          "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
        icon: "🐬",
        time: "8 min",
        link: "/meditation",
      },
      // Add more cards...
    ],
  },
});
</script>
