<template>
  <div class="w-full max-w-2xl mx-auto">
    <div
      class="w-full p-6 transition-transform transform bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
    >
      <h5 class="mb-4 text-xl font-bold text-center text-gray-900">
        {{ formatFirestoreTimestampDate(date) }}
      </h5>
      <p class="text-center text-gray-700">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";

defineProps({
  date: {
    type: Timestamp,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
</script>
