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
        <span v-if="item.icon">
          <Icon :name="item.icon" class="w-6 h-6 mb-1" />
        </span>
        <span class="text-xs">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  {
    label: "Home",
    to: "/",
    icon: "heroicons:home-20-solid",
  },
  {
    label: "CBT",
    to: "/cbt",
    icon: "fa6-solid:brain",
  },
  {
    label: "Gratitude",
    to: "/gratitude",
    icon: "fa6-solid:brain",
  },
  {
    label: "Meditation",
    to: "/meditation",
    icon: "fa6-solid:brain",
  },
];
// akar-icon:air
</script>
