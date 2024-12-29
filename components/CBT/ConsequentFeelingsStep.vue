<!-- components/ConsequentFeelingsStep.vue -->
<template>
  <div class="min-h-screen p-6 bg-gray-50 rounded-t-3xl">
    <h2 class="mb-4 text-2xl font-medium text-blue-500">
      How did these thoughts make you feel?
    </h2>

    <p class="mb-6 text-gray-600">
      What emotions and physical sensations did you experience? How intense were
      they?
    </p>

    <p class="mb-8 italic text-gray-500">
      E.g. Anxiety (8/10), nervous stomach, racing heart, shame (7/10)
    </p>

    <div class="relative">
      <textarea
        v-model="currentInput"
        class="w-full h-40 p-4 border resize-none rounded-xl"
        placeholder="Describe your feelings here"
      />
      <!-- @input="$emit('update:modelValue', $event.target.value)" -->
      <div class="absolute text-sm text-gray-400 bottom-4 right-4">
        {{ remainingChars }} characters remaining
      </div>
    </div>

    <div class="mt-2">
      <button
        class="w-full py-4 font-medium text-white bg-blue-400 rounded-full"
        @click="handleNextStep"
      >
        Next
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
