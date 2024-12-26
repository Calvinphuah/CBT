<template>
  <div class="min-h-screen p-6 bg-gray-50 rounded-t-3xl">
    <h2 class="mb-4 text-2xl font-medium text-blue-500">
      What thoughts or beliefs came up?
    </h2>

    <p class="mb-6 text-gray-600">
      Write down the automatic thoughts and beliefs that arose during this
      situation. What went through your mind?
    </p>

    <p class="mb-8 italic text-gray-500">
      E.g. "I'm not smart enough", "Everyone will think I'm stupid", "I always
      fail at everything"
    </p>

    <div class="relative">
      <textarea
        class="w-full h-40 p-4 border resize-none rounded-xl"
        placeholder="Type your thoughts here"
      />
      <div class="absolute text-sm text-gray-400 bottom-4 right-4">
        {{ remainingChars }} characters remaining
      </div>
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
