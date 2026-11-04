<template>
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <label v-if="label" :for="id" class="text-[15px] font-semibold">
      {{ label }}
    </label>

    <!-- Input Field -->
    <input
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      class="h-[52px] w-full rounded-2xl bg-surface px-4 text-[17px] text-ink ring-[1.5px] ring-inset ring-rule placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-storm disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-sky"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
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
  autocomplete?: string;
}

const {
  id,
  name,
  type,
  placeholder,
  label,
  modelValue,
  disabled,
  readonly,
  autocomplete,
} = withDefaults(defineProps<Props>(), {
  id: "",
  name: "",
  type: "text",
  placeholder: "",
  label: null,
  modelValue: "",
  disabled: false,
  readonly: false,
  autocomplete: undefined,
});

defineEmits<{ (e: "update:modelValue", value: string): void }>();
</script>
