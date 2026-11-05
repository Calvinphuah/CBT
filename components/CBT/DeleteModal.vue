<template>
  <CommonSheet :open="isOpen" title="Delete this record?" @close="onCancel">
    <p class="text-[17px] leading-[25px] text-ink-2">
      It&rsquo;ll be gone for good, on every device. This can&rsquo;t be undone.
    </p>
    <p v-if="error" class="mt-3 text-[15px] text-ink" role="status">{{ error }}</p>
    <div class="mt-5 flex flex-col gap-2.5">
      <button type="button" class="btn-danger w-full" :disabled="loading" @click="onConfirm">
        {{ loading ? "Deleting…" : "Delete record" }}
      </button>
      <button type="button" class="btn-ghost w-full" @click="onCancel">Keep it</button>
    </div>
  </CommonSheet>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  loading?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "confirm" | "cancel"): void;
}>();

const onConfirm = () => emit("confirm");
const onCancel = () => emit("cancel");
</script>
