<template>
  <div class="max-w-lg p-6 mx-auto space-y-6">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="transition-transform transform bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
    >
      <NuxtLink
        :to="{
          name: 'meditation-id',
          params: { id: card.id },
          query: { title: card.title, description: card.description },
        }"
        class="block p-4"
      >
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-800">{{ card.title }}</h3>
          <span class="text-sm font-medium text-gray-500">{{ card.time }}</span>
        </div>
        <p class="text-sm text-gray-600">{{ card.description }}</p>
      </NuxtLink>
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

defineProps<{
  cards: Card[];
}>();
</script>
