<template>
  <div class="mb-6">
    <h2 class="mb-4 text-2xl font-medium text-blue-500">{{ title }}</h2>
    <p class="flex items-center mb-4 text-gray-600">
      {{ description }}
      <button
        class="flex items-center ml-2 text-blue-500 hover:text-blue-700"
        @click="toggleExample"
      >
        <InformationCircleIcon class="w-5 h-5" />
      </button>
    </p>
    <p v-if="showExample" class="mb-4 mr-4 italic text-gray-500">
      {{ example }}
    </p>

    <div v-if="cbtStore.isEditing || cbtStore.isNewEntry" class="relative">
      <textarea
        v-model="localValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        class="w-full resize-none rounded-xl border p-4 h-[calc(10rem-24px)]"
      />
      <div class="h-6 mt-1 text-sm text-right text-gray-400">
        {{ remainingChars }} characters remaining
      </div>
    </div>
    <div v-if="cbtStore.isViewing" class="relative">
      <p>{{ localValue }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  title: {
    type: String,
    default: "Default Title",
  },
  description: {
    type: String,
    default: "Default Description",
  },
  example: {
    type: [String, null],
    default: "Default Example",
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  maxlength: {
    type: Number,
    default: 400,
  },
});

// Event emitter for v-model
const emit = defineEmits(["update:modelValue"]);

// Create a local value to bind with v-model
const localValue = ref(props.modelValue);

// Watch for changes in `localValue` and emit updates to the parent
watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

// Update `localValue` when `modelValue` prop changes from the parent
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

// Remaining characters computed property
const remainingChars = computed(
  () => props.maxlength - (localValue.value?.length || 0)
);

// State for toggling the example
const showExample = ref(false);
const toggleExample = () => {
  showExample.value = !showExample.value;
};

const cbtStore = useCBTStore();
</script>
