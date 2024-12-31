<template>
  <div class="flex items-center justify-between p-4 text-white bg-purple-400">
    <ArrowLeftIcon
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="$emit('back')"
    />
    <h1 class="text-xl font-medium">CBT</h1>
    <PlusIcon
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="$emit('new')"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";

// Define emits
defineEmits(["back", "new"]);
</script>
