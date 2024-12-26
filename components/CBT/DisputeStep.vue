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
        v-model="currentInput"
        class="w-full h-40 p-4 border resize-none rounded-xl"
        placeholder="Write your challenges here"
      />
      <div class="absolute text-sm text-gray-400 bottom-4 right-4">
        {{ remainingChars }} characters remaining
      </div>
    </div>

    <div class="mt-2">
      <button
        class="w-full py-4 font-medium text-white bg-blue-400 rounded-full"
        @click="handleNextStep"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useCBTStore();

// Computed binding for the current step input
const currentInput = computed({
  get: () => store.currentStepData,
  set: (value: string) => store.updateStepData(value),
});

// Getter for remaining characters
const remainingChars = computed(() => store.remainingChars);

// Function to handle the "Next" button click
const handleNextStep = () => {
  if (store.isCurrentStepValid) {
    store.nextStep();
  } else {
    alert("Please fill out this step before proceeding.");
  }
};
</script>
