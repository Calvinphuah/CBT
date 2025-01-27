<template>
  <nav class="sticky top-0 z-[999] w-full bg-white">
    <div class="flex items-center justify-between p-4 px-5">
      <!-- Back Icon -->
      <NuxtLink to="/">
        <ArrowLeftIcon class="size-7 text-light-100 hover:cursor-pointer" />
      </NuxtLink>

      <h1 class="flex-1 text-xl font-medium text-center">Meditation</h1>

      <!-- Action Icons -->
      <div class="size-7 text-light-100" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
</script>
