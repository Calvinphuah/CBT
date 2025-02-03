<template>
  <div class="max-w-md mx-auto">
    <div
      class="relative p-6 pt-12 bg-white border border-black rounded-lg shadow-sm lg:min-h-[370px] z-7"
    >
      <!-- Centered Top Icon -->
      <div class="absolute -translate-x-1/2 left-1/2 -top-8">
        <div
          class="w-16 h-16 rounded-full bg-[#FDF1EC] flex items-center justify-center border border-black"
        >
          <img
            :src="imageSrc"
            alt="Leaf icon"
            class="object-contain w-10 h-10"
          />
        </div>
      </div>

      <!-- Rest of the template remains exactly the same -->
      <h2 class="mb-4 text-xl font-medium text-center text-gray-800">
        {{ title }}
      </h2>

      <div
        v-if="cbtStore.isEditing || cbtStore.isNewEntry"
        class="flex items-start gap-1 mb-4"
      >
        <p class="text-gray-600">{{ description }}</p>
        <button
          v-if="example"
          class="flex-shrink-0 mt-0.5 text-gray-500 hover:text-gray-700"
          @click="toggleExample"
        >
          <InformationCircleIcon class="w-4 h-4" />
        </button>
      </div>

      <p
        v-if="showExample && example"
        class="mb-4 text-sm italic text-gray-500"
      >
        {{ example }}
      </p>

      <div v-if="cbtStore.isEditing || cbtStore.isNewEntry" class="relative">
        <textarea
          v-model="localValue"
          :placeholder="placeholder"
          :maxlength="maxlength"
          class="w-full h-32 p-4 transition-all border border-gray-200 outline-none resize-none rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        />
        <div class="h-6 mt-1 text-sm text-right text-gray-400">
          {{ remainingChars }} characters remaining
        </div>
      </div>

      <div v-if="cbtStore.isViewing" class="relative">
        <p class="p-4 bg-gray-50 rounded-xl">{{ localValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script section remains exactly the same
import { ref, computed, watch } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  title: {
    type: String,
    default: "Activating Event",
  },
  description: {
    type: String,
    default:
      "Describe the situation and why you're worried about it. Be as specific as you can with your reasoning.",
  },
  example: {
    type: [String, null],
    default: null,
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Work has been really stressful lately",
  },
  maxlength: {
    type: Number,
    default: 400,
  },
  imageSrc: {
    type: String,
    default: "/img/leaf.png",
  },
});

const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);
const showExample = ref(false);

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const remainingChars = computed(
  () => props.maxlength - (localValue.value?.length || 0)
);

const toggleExample = () => {
  showExample.value = !showExample.value;
};

const cbtStore = useCBTStore();
</script>
