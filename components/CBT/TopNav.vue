<template>
  <div
    class="sticky top-0 z-50 flex items-center justify-between p-4 text-white bg-purple-400"
  >
    <!-- Back Icon -->
    <ArrowLeftIcon
      v-if="cbtStore.isNewEntry || cbtStore.isEditing"
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="cbtStore.handleCancelEntry"
    />

    <NuxtLink v-else-if="!cbtStore.isEditing && !cbtStore.isNewEntry" to="/">
      <ArrowLeftIcon class="size-7 text-light-100 hover:cursor-pointer" />
    </NuxtLink>

    <!-- Title -->
    <h1
      v-if="!cbtStore.isEditing && !cbtStore.isNewEntry"
      class="flex-1 text-xl font-medium text-center"
    >
      CBT
    </h1>
    <h1
      v-if="cbtStore.isEditing"
      class="flex-1 text-xl font-medium text-center"
    >
      Editing Entry
    </h1>
    <h1
      v-if="cbtStore.isNewEntry"
      class="flex-1 text-xl font-medium text-center"
    >
      New Entry
    </h1>

    <!-- Action Icons -->
    <PlusIcon
      v-if="!cbtStore.isEditing && !cbtStore.isNewEntry"
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="cbtStore.handleNewEntry"
    />
    <div
      v-else-if="cbtStore.isEditing || cbtStore.isNewEntry"
      class="hover:cursor-pointer"
      @click="cbtStore.submitCurrentEntry"
    >
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";

const cbtStore = useCBTStore();
</script>
