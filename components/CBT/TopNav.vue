<template>
  <div class="flex items-center justify-between p-4 text-white bg-purple-400">
    <!-- Back Icon -->
    <ArrowLeftIcon
      v-if="cbtStore.isNewEntry"
      class="size-7 text-light-100 hover:cursor-pointer"
    />

    <NuxtLink v-else-if="!cbtStore.isEditing && !cbtStore.isNewEntry" to="/">
      <ArrowLeftIcon class="size-7 text-light-100 hover:cursor-pointer" />
    </NuxtLink>

    <div v-else-if="cbtStore.isEditing" class="ml-2 hover:cursor-pointer">
      Cancel
    </div>

    <!-- Title -->
    <h1 class="flex-1 text-xl font-medium text-center">CBT</h1>

    <!-- Action Icons -->
    <PlusIcon
      v-if="!cbtStore.isEditing && !cbtStore.isNewEntry"
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="cbtStore.handleNewEntry"
    />
    <div v-else-if="cbtStore.isEditing" class="mr-3 hover:cursor-pointer">
      Save
    </div>
    <div v-else-if="cbtStore.isNewEntry" class="mr-3 hover:cursor-pointer">
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";

const cbtStore = useCBTStore();
</script>
