<template>
  <div
    class="sticky top-0 z-50 flex items-center justify-between p-4 text-white bg-purple-400"
  >
    <!-- Back Icon -->
    <NuxtLink to="/">
      <ArrowLeftIcon class="size-7 text-light-100 hover:cursor-pointer"
    /></NuxtLink>

    <h1 class="flex-1 text-xl font-medium text-center">Gratitude</h1>

    <!-- Action Icons -->
    <PlusIcon
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="gratitudeStore.handleNewEntry"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";
const gratitudeStore = useGratitudeStore();
</script>
