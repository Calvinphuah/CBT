<template>
  <div
    class="sticky top-0 z-50 flex items-center justify-between p-4 px-5 text-white bg-gray-800"
  >
    <!-- Back Icon -->
    <ArrowLeftIcon
      v-if="cbtStore.isNewEntry || cbtStore.isViewing"
      class="size-7 text-light-100 hover:cursor-pointer"
      @click="cbtStore.handleCancelEntry"
    />

    <NuxtLink
      v-else-if="
        !cbtStore.isEditing && !cbtStore.isNewEntry && !cbtStore.isViewing
      "
      to="/"
    >
      <ArrowLeftIcon class="size-7 text-light-100 hover:cursor-pointer" />
    </NuxtLink>

    <div
      v-else-if="cbtStore.isEditing"
      class="hover:cursor-pointer"
      @click="cbtStore.cancelUpdateEntry"
    >
      Cancel
    </div>

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
      v-if="!cbtStore.isEditing && !cbtStore.isNewEntry && !cbtStore.isViewing"
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
    <div
      v-else-if="cbtStore.isViewing"
      class="hover:cursor-pointer"
      @click="cbtStore.handleUpdateEntry"
    >
      Edit
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, PlusIcon } from "@heroicons/vue/24/solid";

const cbtStore = useCBTStore();
</script>
