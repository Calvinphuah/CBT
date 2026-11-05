<template>
  <div>
    <label :for="id" class="sr-only">{{ label }}</label>
    <textarea
      :id="id"
      ref="textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :rows="rows"
      :aria-describedby="describedBy || undefined"
      class="field"
      :class="{ 'field-sky': tone === 'sky' }"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <p
      v-if="remainingChars <= 50"
      class="mt-1 text-right text-[13px] text-ink-3"
      aria-live="polite"
    >
      {{ remainingChars }} characters left
    </p>
  </div>
</template>

<script setup lang="ts">
const {
  modelValue = "",
  id,
  label,
  placeholder = "",
  maxlength = 400,
  rows = 5,
  tone = "plain",
  describedBy = "",
} = defineProps<{
  modelValue?: string;
  id: string;
  label: string;
  placeholder?: string;
  maxlength?: number;
  rows?: number;
  tone?: "plain" | "sky";
  describedBy?: string;
}>();

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const textarea = ref<HTMLTextAreaElement | null>(null);

const remainingChars = computed(() => maxlength - (modelValue?.length || 0));

defineExpose({
  focus: () => textarea.value?.focus(),
});
</script>
