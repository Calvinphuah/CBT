<template>
  <div
    class="flex flex-col items-center justify-center w-full h-full min-h-screen p-4 md:p-8"
  >
    <!-- Rotating Image Carousel -->
    <div class="relative w-64 h-64 mb-4 overflow-hidden">
      <transition name="fade" mode="out-in">
        <img
          :key="currentImage"
          :src="currentImage"
          alt="Cogni Feature"
          class="object-cover w-full h-full"
        />
      </transition>
    </div>

    <!-- Tagline -->
    <p class="max-w-md text-base text-center text-gray-600 md:text-lg">
      Welcome to Cogni - Simplify Your Life.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// Array of image paths
const images = ["img/cat.png", "img/wavy-leaf.png", "img/leaf.png"];

// Reactive state for the current image
const currentImageIndex = ref(0);
const currentImage = ref(images[currentImageIndex.value]);

let intervalId: ReturnType<typeof setInterval>;

// Function to rotate images
const rotateImages = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  currentImage.value = images[currentImageIndex.value];
};

// Start rotating images when the component is mounted
onMounted(() => {
  intervalId = setInterval(rotateImages, 4000); // Change image every 3 seconds
});

// Clear interval when the component is unmounted to prevent memory leaks
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
/* Simple fade transition for image change */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
