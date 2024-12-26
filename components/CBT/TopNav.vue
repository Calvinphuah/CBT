<template>
  <div class="flex items-center justify-between p-4 text-white bg-purple-400">
    <ArrowLeftIcon
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="store.previousStep"
    />
    <h1 class="text-xl font-medium">CBT</h1>
    <ArrowLeftIcon
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="store.previousStep"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
const store = useCBTStore();
</script>

<style scoped></style>
