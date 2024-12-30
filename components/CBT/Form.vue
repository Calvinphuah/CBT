<template>
  {{ store.formData }}
  <div class="min-h-screen p-6 bg-gray-50 rounded-t-3xl">
    <!-- Toggle Examples Button -->
    <div class="flex justify-end mb-4">
      <button
        class="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg"
        @click="toggleExamples"
      >
        {{ showExamples ? "Hide Examples" : "Show Examples" }}
      </button>
    </div>

    <!-- Input Fields Rendered Dynamically -->
    <CBTInputField
      v-for="(field, index) in inputFields"
      :key="index"
      v-model="store.formData[field.model]"
      :title="field.title"
      :description="field.description"
      :example="showExamples ? field.example : null"
      :placeholder="field.placeholder"
    />

    <!-- Save Button -->
    <div class="mt-4">
      <button
        class="w-full py-4 mb-10 font-medium text-white bg-blue-400 rounded-full"
        @click="handleSave"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Use the store
const store = useCBTStore();

// State to toggle examples visibility
const showExamples = ref(true);

// Function to toggle the examples
const toggleExamples = () => {
  showExamples.value = !showExamples.value;
};

// Define input field configurations
const inputFields = [
  {
    model: "activating",
    title: "What's worrying you right now and why?",
    description:
      "Describe the situation and why you're worried about it. Be as specific as you can with your reasoning.",
    example:
      "E.g. There's a science test on Monday. I know for sure I'll get a zero and that people will laugh. Maybe I'll fail the class.",
    placeholder: "Type something",
  },
  {
    model: "beliefs",
    title: "What thoughts or beliefs came up?",
    description:
      "Write down the automatic thoughts and beliefs that arose during this situation. What went through your mind?",
    example:
      'E.g. "I\'m not smart enough", "Everyone will think I\'m stupid", "I always fail at everything"',
    placeholder: "Type your thoughts here",
  },
  {
    model: "consequentFeelings",
    title: "How did you feel as a result?",
    description:
      "Describe your emotions and feelings that arose because of the thoughts and beliefs you had.",
    example: 'E.g. "I felt anxious", "I felt hopeless", "I felt angry"',
    placeholder: "Describe your feelings",
  },
  {
    model: "dispute",
    title: "How can you dispute these thoughts?",
    description:
      "Write down evidence or reasons why these thoughts might not be true or helpful.",
    example:
      'E.g. "I\'ve passed tests before", "People rarely notice small mistakes", "Failing one test doesn\'t mean I\'ll fail the class"',
    placeholder: "Dispute your thoughts",
  },
];

// Submit handler
const handleSave = async () => {
  try {
    await store.submitCurrentEntry();
    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>
