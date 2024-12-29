<template>
  <div class="min-h-screen p-6 bg-gray-50 rounded-t-3xl">
    <h2 class="mb-4 text-2xl font-medium text-blue-500">
      {{ title }}
    </h2>

    <p class="mb-6 text-gray-600">
      {{ description }}
    </p>

    <p v-if="example" class="mb-8 italic text-gray-500">
      {{ example }}
    </p>

    <div class="relative">
      <textarea
        v-model="inputValue"
        class="w-full h-40 p-4 border resize-none rounded-xl"
        :placeholder="placeholder"
        :maxlength="maxLength"
      />
      <div class="absolute text-sm text-gray-400 bottom-4 right-4">
        {{ remainingChars }} characters remaining
      </div>
    </div>
    <div class="mt-2 bottom-20">
      <button
        class="w-full py-4 font-medium text-white bg-blue-400 rounded-full"
        @click="handleNext"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  example: string;
  placeholder?: string;
  maxLength?: number;
  buttonText?: string;
  modelValue: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Type something",
  maxLength: 400,
  buttonText: "Next",
});

const emit = defineEmits(["update:modelValue", "next"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const remainingChars = computed(
  () => props.maxLength - inputValue.value.length
);

const handleNext = () => {
  if (inputValue.value.trim()) {
    emit("next");
  } else {
    alert("Please fill out this step before proceeding.");
  }
};
</script>
