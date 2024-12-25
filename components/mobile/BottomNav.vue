<!-- components/nav/BottomNav.vue -->
<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t">
    <div class="flex justify-around items-center py-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="flex flex-col items-center px-4 py-2"
        :class="{ 'text-blue-500': item.active, 'text-gray-500': !item.active }"
      >
        <!-- <component :is="item.icon" class="w-6 h-6 mb-1" /> -->
        <span class="text-xs">{{ item.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const navItems = [{ name: "Home", path: "/", active: false }];
</script>
