<template>
  <NuxtLink :to="link">
    <div
      class="snap-center border rounded-lg shadow-md flex-shrink-0 overflow-hidden bg-white min-w-80"
      :class="responsiveCardClasses"
    >
      <!-- Top Half: Image Section -->
      <div class="h-3/5 bg-gray-200">
        <img
          src="../../assets/images/meditate.png"
          alt="Card Image"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex flex-col justify-between h-2/5 p-6">
        <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
        <slot />
      </div></div
  ></NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  image: { type: String, required: false, default: "" },
  link: { type: String, required: false, default: "/" },
});

const { title, image, link } = props;

// Responsive classes for card dimensions
const responsiveCardClasses = computed(
  () => `
    w-[80%] max-w-[320px] sm:w-[60%] md:w-[40%]
    aspect-[3/4] mx-auto
  `
);
</script>

<style scoped></style>
