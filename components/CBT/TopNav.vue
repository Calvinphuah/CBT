<template>
  <div class="flex items-center justify-between p-4 text-white bg-purple-400">
    <ArrowLeftIcon
      v-if="showBackButton"
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="$emit('back')"
    />
    <div v-else class="size-7" />
    <!-- Empty div for spacing -->

    <h1 class="text-xl font-medium">CBT</h1>

    <PlusIcon
      v-if="!showBackButton"
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="$emit('new')"
    />
    <div v-else class="size-7" />
    <!-- Empty div for spacing -->
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";

defineProps<{
  showBackButton?: boolean;
}>();

defineEmits<{
  back: [];
  new: [];
}>();
</script>
