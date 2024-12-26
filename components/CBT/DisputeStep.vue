<!-- components/DisputeStep.vue -->
<template>
  <div class="min-h-screen p-6 bg-gray-50 rounded-t-3xl">
    <h2 class="mb-4 text-2xl font-medium text-blue-500">
      Let's challenge these thoughts
    </h2>

    <p class="mb-6 text-gray-600">
      What evidence supports or contradicts these thoughts? Are there
      alternative explanations? What would you tell a friend in this situation?
    </p>

    <p class="mb-8 italic text-gray-500">
      E.g. "I've passed tests before", "One test doesn't determine my worth", "I
      can study and ask for help if needed"
    </p>

    <div class="relative">
      <textarea
        class="w-full h-40 p-4 border resize-none rounded-xl"
        placeholder="Write your challenges here"
      />
      <div class="absolute text-sm text-gray-400 bottom-4 right-4"></div>
    </div>

    <div class="fixed left-0 right-0 px-6 bottom-20">
      <button
        class="w-full py-4 font-medium text-white bg-blue-400 rounded-full"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
