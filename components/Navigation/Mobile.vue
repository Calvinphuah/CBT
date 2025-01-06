<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-gray-800 md:hidden">
    <div class="flex justify-around p-2">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        class="flex flex-col items-center text-gray-400 hover:text-white"
        active-class="text-white"
      >
        <span v-if="item.icon">
          <component :is="item.icon" class="w-6 h-6" />
        </span>
        <span class="text-xs">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  ChartBarIcon,
  HeartIcon,
  CloudIcon,
} from "@heroicons/vue/24/solid";

const navItems = [
  {
    label: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    label: "CBT",
    to: "/cbt",
    icon: ChartBarIcon,
  },
  {
    label: "Gratitude",
    to: "/gratitude",
    icon: HeartIcon,
  },
  {
    label: "Breathing",
    to: "/breathing",
    icon: CloudIcon,
  },
];
</script>
