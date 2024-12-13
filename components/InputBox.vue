<template>
  <div>
    <!-- Label -->
    <label v-if="label" :for="id" class="font-medium">
      {{ label }}
    </label>

    <!-- Input Field -->
    <div class="flex items-center gap-2">
      <input
        :id="id"
        :type="isPasswordVisible ? 'text' : type"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        class="flex-1 bg-bg-000 border border-border-200 hover:border-border-100 transition-colors placeholder:text-text-500 focus:border-accent-secondary-100 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 h-11 px-3 rounded-[0.6rem]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <!-- <div
        v-if="type === 'password'"
        class="absolute right-3 cursor-pointer text-gray-600 hover:text-gray-800"
        @click="togglePasswordVisibility"
      >
        <Icon
          :name="
            isPasswordVisible
              ? 'heroicons-outline:eye-off'
              : 'heroicons-outline:eye'
          "
          size="20"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string | null;
  modelValue?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const { id, name, type, placeholder, label, modelValue, disabled, readonly } =
  withDefaults(defineProps<Props>(), {
    id: "",
    name: "",
    type: "text",
    placeholder: "",
    label: null,
    modelValue: "",
    disabled: false,
    readonly: false,
  });

// State to manage password visibility
const isPasswordVisible = ref(false);

// Toggle the visibility state
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style scoped></style>
