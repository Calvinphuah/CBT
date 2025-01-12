<template>
  <NuxtLink
    :to="card.link"
    class="relative flex items-center gap-4 p-6 transition-transform duration-200 bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
  >
    <!-- Card Image -->
    <img
      :src="card.image"
      :alt="card.title"
      class="object-cover w-16 h-16 rounded-lg"
    />

    <!-- Card Content -->
    <div class="flex-1">
      <h2 class="text-lg font-semibold text-gray-800">{{ card.title }}</h2>
      <p class="text-sm text-gray-600">{{ card.description }}</p>
    </div>

    <!-- Card Time -->
    <span class="text-sm text-gray-500">{{ card.time }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      description: "",
      time: "",
      link: "",
      image: "",
    }),
  },
});
</script>
