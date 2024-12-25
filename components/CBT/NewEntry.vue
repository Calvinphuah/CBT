<!-- components/CBTWorryForm.vue -->
<template>
  <div
    class="min-h-screen bg-purple-400 bg-gradient-to-b from-purple-400 to-purple-300"
  >
    <!-- Progress Steps -->
    <div class="px-8 py-6">
      <div class="relative flex justify-between">
        <!-- Progress Line -->
        <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30" />
        <div
          class="absolute top-1/2 left-0 right-0 h-0.5 bg-white"
          style="width: 0%"
        />

        <!-- Step Indicators -->
        <div
          v-for="(step, index) in steps"
          :key="step.name"
          class="relative flex flex-col items-center z-10"
        >
          <div
            :class="[
              'w-4 h-4 rounded-full mb-2',
              index === currentStep ? 'bg-white' : 'bg-white/30',
            ]"
          />
          <span class="text-white text-center text-sm whitespace-nowrap">
            {{ step.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="bg-gray-50 min-h-screen rounded-t-3xl p-6">
      <h2 class="text-2xl text-blue-500 font-medium mb-4">
        What's worrying you right now and why?
      </h2>

      <p class="text-gray-600 mb-6">
        Describe the situation and why you're worried about it. Be as specific
        as you can with your reasoning.
      </p>

      <p class="text-gray-500 italic mb-8">
        E.g. There's a science test on Monday. I know for sure I'll get a zero
        and that people will laugh. Maybe I'll fail the class.
      </p>

      <div class="relative">
        <textarea
          v-model="worryText"
          class="w-full border rounded-xl p-4 h-40 resize-none"
          placeholder="Type something"
        />
        <div class="absolute bottom-4 right-4 text-gray-400 text-sm">
          {{ remainingChars }} characters remaining
        </div>
      </div>

      <!-- Next Button -->
      <div class="fixed bottom-20 left-0 right-0 px-6">
        <button
          class="w-full bg-blue-400 text-white rounded-full py-4 font-medium"
          :disabled="!worryText.length"
          :class="{ 'opacity-50': !worryText.length }"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  { name: "Define\nWorries", completed: false },
  { name: "Thinking\nTrap", completed: false },
  { name: "Balance\nThought", completed: false },
];

const currentStep = ref(0);
const worryText = ref("");
const maxChars = 400;

const remainingChars = computed(() => {
  return maxChars - worryText.value.length;
});
</script>

<style scoped>
/* Optional: Add smooth transitions */
.bg-gradient-to-b {
  background-size: 100% 200%;
  transition: background-position 0.3s ease;
}

textarea:focus {
  outline: none;
  border-color: #93c5fd;
  ring: 2px solid #93c5fd;
}
</style>
