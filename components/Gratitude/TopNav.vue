<template>
  <div>
    <div class="flex min-h-14 items-center justify-between">
      <h1 class="text-display">Gratitude</h1>
      <button
        type="button"
        class="icon-btn-filled"
        aria-label="New gratitude entry"
        @click="gratitudeStore.handleNewEntry"
      >
        <PlusIcon class="size-6" aria-hidden="true" />
      </button>
    </div>
    <p class="text-[15px] text-ink-3">Small bright spots from your days.</p>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";

const gratitudeStore = useGratitudeStore();
</script>
