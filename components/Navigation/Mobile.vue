<template>
  <!-- Bottom -->
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white md:hidden z-[100] w-full rounded-t-lg safe-area-fix"
  >
    <div class="flex justify-around p-4">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        class="flex flex-col items-center text-gray-400 hover:text-gray-600"
        active-class="text-gray-800"
      >
        <div class="flex items-center justify-center w-6 h-6">
          <component :is="item.icon" v-if="item.icon" class="w-full h-full" />
          <Icon v-else :name="item.name" class="w-full h-full" />
        </div>
        <span class="mt-1 text-xs">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { HomeIcon, HeartIcon, CloudIcon } from "@heroicons/vue/24/solid";
const navItems = [
  {
    label: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    label: "CBT",
    to: "/cbt",
    name: "fluent:brain-sparkle-20-filled",
  },
  {
    label: "Gratitude",
    to: "/gratitude",
    icon: HeartIcon,
  },
  {
    label: "Meditation",
    to: "/meditation",
    icon: CloudIcon,
  },
];
</script>

<style scoped>
/* Add these styles to handle mobile keyboard */
.safe-area-fix {
  padding-bottom: env(safe-area-inset-bottom);
  height: auto;
  /* This ensures the nav stays at the bottom even with keyboard */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* Prevent nav from being pushed up by keyboard */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  /* Additional Safari/iOS support */
  -webkit-touch-callout: none;
}

@supports (-webkit-touch-callout: none) {
  /* iOS specific fix */
  .safe-area-fix {
    padding-bottom: max(env(safe-area-inset-bottom), 20px);
  }
}
</style>
