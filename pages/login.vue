<template>
  <div class="relative flex flex-wrap-reverse min-h-screen md:flex-row">
    <!-- Temporary Mobile Overlay -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="showMobileOverlay"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white"
        @click="dismissOverlay"
      >
        <div class="flex items-center justify-center w-full h-full" @click.stop>
          <LoginLeftSide />
        </div>
      </div>
    </transition>

    <!-- Left Side (Bottom on small screens) -->
    <div class="order-1 w-full md:w-1/2">
      <LoginLeftSide />
    </div>

    <!-- Right Side (Top on small screens) -->
    <div class="order-2 w-full md:w-1/2">
      <LoginRightSide />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

// Reactive state for mobile overlay
const showMobileOverlay = ref(false);
const overlayTimeout = ref<NodeJS.Timeout | null>(null);

// Function to dismiss overlay
const dismissOverlay = () => {
  showMobileOverlay.value = false;
  if (overlayTimeout.value) {
    clearTimeout(overlayTimeout.value);
  }
};

// Lifecycle hooks to manage overlay
onMounted(() => {
  // Only show on mobile screens (sm breakpoint is 640px in Tailwind)
  if (window.innerWidth < 640) {
    showMobileOverlay.value = true;

    // Automatically dismiss after 1 second
    overlayTimeout.value = setTimeout(() => {
      showMobileOverlay.value = false;
    }, 1500);
  }
});

// Clean up timeout on component unmount
onUnmounted(() => {
  if (overlayTimeout.value) {
    clearTimeout(overlayTimeout.value);
  }
});
</script>
