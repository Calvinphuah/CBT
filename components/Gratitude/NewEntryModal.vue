<template>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
      <h3
        id="modal-title"
        class="text-lg font-semibold text-center text-gray-900"
      >
        Add to Gratitude Journal
      </h3>
      <div class="mt-4">
        <textarea
          v-model="gratitudeStore.newEntry"
          class="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="What are you grateful for today?"
          rows="5"
        ></textarea>
      </div>

      <div class="flex items-center justify-between mt-4 space-x-2">
        <div>
          <button
            type="button"
            class="flex items-center justify-center text-white bg-yellow-500 rounded-md w-9 h-9 hover:bg-yellow-600 focus:ring focus:ring-yellow-300"
            @click="gratitudeStore.generateGratitudeEntry"
          >
            <SparklesIcon class="w-6 h-6" />
          </button>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            @click="gratitudeStore.handleResetEntry"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            @click="gratitudeStore.addEntry(gratitudeStore.newEntry)"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/solid";
const gratitudeStore = useGratitudeStore();
</script>
