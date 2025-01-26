<template>
  <NuxtLink
    :to="card.link"
    class="flex flex-col w-full gap-2 p-4 transition-transform duration-200 rounded-lg shadow-md hover:scale-103 hover:shadow-lg"
    :class="card.color"
  >
    <div class="flex items-center justify-between w-full">
      <h2 class="text-xl font-semibold text-gray-800 shrink-0">
        {{ card.title }}
      </h2>
      <CommonPill :time="card.time" />
    </div>
    <div>
      <img
        :src="card.image"
        :alt="card.title"
        :style="{
          width: `${card.imageWidth || 64}px`,
          height: `${card.imageHeight || 64}px`,
          marginLeft: `${card.marginLeft || 0}px`,
        }"
        class="object-cover rounded-lg"
      />
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
