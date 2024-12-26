<template>
  <div class="min-h-screen p-6 bg-gray-50 rounded-t-3xl">
    <h2 class="mb-4 text-2xl font-medium text-blue-500">
      What's worrying you right now and why?
    </h2>

    <p class="mb-6 text-gray-600">
      Describe the situation and why you're worried about it. Be as specific as
      you can with your reasoning.
    </p>

    <p class="mb-8 italic text-gray-500">
      E.g. There's a science test on Monday. I know for sure I'll get a zero and
      that people will laugh. Maybe I'll fail the class.
    </p>

    <div class="relative">
      <textarea
        v-model="currentInput"
        class="w-full resize-none rounded-xl border p-4 h-[calc(10rem-24px)]"
        placeholder="Type something"
        maxlength="400"
      />
      <div class="h-6 mt-1 text-sm text-right text-gray-400">
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
