<template>
  <div class="p-4 pb-24 bg-gray-50">
    <!-- Input Fields Container -->
    <div class="flex flex-col gap-4 md:flex-row md:flex-wrap">
      <CBTInputField
        v-for="(field, index) in inputFields"
        :key="index"
        v-model="cbtStore.formData[field.model]"
        :title="field.title"
        :description="field.description"
        :example="showExamples ? field.example : null"
        :placeholder="field.placeholder"
        :image-src="field.imageSrc"
        class="flex flex-col justify-between w-full p-4 bg-white rounded-lg shadow-sm md:w-1/2"
      />
    </div>

    <!-- Delete Button (Displayed at Bottom of Input Fields) -->
    <div v-if="cbtStore.isEditing" class="px-4 mt-4 md:px-6 lg:px-8">
      <button
        class="w-full px-4 py-4 font-medium text-white bg-red-500 rounded-full"
        @click="showDeleteModal = true"
      >
        Delete
      </button>
    </div>

    <!-- Action Buttons (Save/Cancel) -->
    <div
      v-if="!cbtStore.isEditing && !cbtStore.isViewing"
      class="mt-4 space-y-4"
    >
      <button
        class="w-full py-4 font-medium text-white bg-blue-400 rounded-full"
        :disabled="!isFormValid"
        @click="cbtStore.submitCurrentEntry"
      >
        Save
      </button>
      <button
        class="w-full py-4 font-medium text-gray-600 bg-gray-200 rounded-full"
        @click="cbtStore.handleCancelEntry"
      >
        Cancel
      </button>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <CBTDeleteModal
    :is-open="showDeleteModal"
    @confirm="handleDeleteConfirm"
    @cancel="handleDeleteCancel"
  />
</template>

<script setup lang="ts">
// Store & State
const cbtStore = useCBTStore();
const showExamples = ref(true);

// Computed
const isFormValid = computed(() => {
  return Object.values(cbtStore.formData).every(
    (value) => value.trim().length > 0
  );
});

// Input Field Configurations
const inputFields = [
  {
    model: "activating",
    // title: "What's worrying you right now and why?",
    title: "Activating Event",
    description:
      "Describe the situation and why you're worried about it. Be as specific as you can with your reasoning.",
    example:
      "E.g. There's a science test on Monday. I know for sure I'll get a zero and that people will laugh. Maybe I'll fail the class.",
    placeholder: "Enter the activating event",
    imageSrc: "img/leaf.png",
  },
  {
    model: "beliefs",
    title: "Beliefs",
    description:
      "Write down the automatic thoughts and beliefs that arose during this situation. What went through your mind?",
    example:
      'E.g. "I\'m not smart enough", "Everyone will think I\'m stupid", "I always fail at everything"',
    placeholder: "Type your thoughts here",
    imageSrc: "img/wavy-leaf.png",
  },
  {
    model: "consequentFeelings",
    title: "Consequent Feelings",
    description:
      "Describe your emotions and feelings that arose because of the thoughts and beliefs you had.",
    example: 'E.g. "I felt anxious", "I felt hopeless", "I felt angry"',
    placeholder: "Describe your feelings",
    imageSrc: "img/popcorn.png",
  },
  {
    model: "dispute",
    title: "Dispute",
    description:
      "Write down evidence or reasons why these thoughts might not be true or helpful.",
    example:
      'E.g. "I\'ve passed tests before", "People rarely notice small mistakes", "Failing one test doesn\'t mean I\'ll fail the class"',
    placeholder: "Dispute your thoughts",
    imageSrc: "img/cat.png",
  },
];

const showDeleteModal = ref(false);

const handleDeleteConfirm = async () => {
  showDeleteModal.value = false;
  await cbtStore.deleteEntry();
};

const handleDeleteCancel = () => {
  showDeleteModal.value = false;
};
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
