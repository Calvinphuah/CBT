<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-gray-800 md:hidden z-[9999]">
    <div class="flex justify-around p-2">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        class="flex flex-col items-center text-gray-400 hover:text-white"
        active-class="text-white"
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
