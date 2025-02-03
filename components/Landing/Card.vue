<template>
  <NuxtLink
    :to="card.link"
    class="flex flex-col gap-4 p-4 transition-transform duration-200 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
    :class="card.color"
  >
    <div class="flex flex-col space-y-4">
      <!-- Title and Pill Container -->
      <div class="flex items-center justify-between w-full">
        <h2 class="flex-grow pr-4 text-xl font-semibold text-gray-800 truncate">
          {{ card.title }}
        </h2>
        <CommonPill :time="card.time" class="flex-shrink-0 ml-2" />
      </div>

      <!-- Responsive Centered Image -->
      <div class="flex items-center justify-center w-full">
        <img
          :src="card.image"
          :alt="card.title"
          class="object-cover w-full h-auto rounded-lg max-w-60"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>
