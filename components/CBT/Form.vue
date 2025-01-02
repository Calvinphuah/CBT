<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Controls -->
    <div class="flex justify-between mb-4">
      <button
        v-if="entry"
        class="px-4 py-2 font-medium text-white bg-red-500 rounded-lg"
        @click="handleDelete"
      >
        Delete
      </button>
    </div>

    <!-- Input Fields -->
    <CBTInputField
      v-for="(field, index) in inputFields"
      :key="index"
      v-model="cbtStore.formData[field.model]"
      :title="field.title"
      :description="field.description"
      :example="showExamples ? field.example : null"
      :placeholder="field.placeholder"
    />

    <!-- Action Buttons -->
    <div v-if="!cbtStore.isEditing" class="mt-4 space-y-4">
      <button
        class="w-full py-4 font-medium text-white bg-blue-400 rounded-full"
        :disabled="!isFormValid"
        @click="cbtStore.submitCurrentEntry"
      >
        {{ entry ? "Update" : "Save" }}
      </button>

      <button
        class="w-full py-4 font-medium text-gray-600 bg-gray-200 rounded-full"
        @click="cbtStore.handleCancelEntry"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CBTEntry } from "~/types/cbt";

// Props & Emits
const props = defineProps<{
  entry?: CBTEntry | null;
}>();

const emit = defineEmits<{
  save: [];
  cancel: [];
}>();

// Store & State
const cbtStore = useCBTStore();
const showExamples = ref(true);

// Computed
const isFormValid = computed(() => {
  return Object.values(cbtStore.formData).every(
    (value) => value.trim().length > 0
  );
});

// Methods

const handleDelete = async () => {
  if (!props.entry) return;

  if (confirm("Are you sure you want to delete this entry?")) {
    try {
      await cbtStore.deleteEntry(props.entry.id);
      emit("cancel");
    } catch (error) {
      console.error("Error deleting entry:", error);
      // You might want to show an error notification here
    }
  }
};

// Input Field Configurations
const inputFields = [
  {
    model: "activating",
    // title: "What's worrying you right now and why?",
    title: "A: Activating Event",
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

// Lifecycle Hooks
onMounted(() => {
  // If we have an entry, populate the form
  if (props.entry) {
    cbtStore.formData = {
      activating: props.entry.activatingEvent,
      beliefs: props.entry.beliefs,
      consequentFeelings: props.entry.consequentFeelings,
      dispute: props.entry.disputes,
    };
  }
});

onBeforeUnmount(() => {
  // Clean up form data when component is destroyed
  if (!props.entry) {
    cbtStore.resetForm();
  }
});
</script>

<style scoped>
.min-h-screen {
  min-height: calc(100vh - 64px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
