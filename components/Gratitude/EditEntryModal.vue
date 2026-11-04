<template>
  <CommonSheet
    :open="gratitudeStore.isEditing && !showDeleteModal"
    title="Edit bright spot"
    @close="gratitudeStore.handleResetEntry"
  >
    <div class="flex flex-col gap-4">
      <div>
        <label for="gratitude-edit" class="sr-only">Bright spot</label>
        <textarea
          id="gratitude-edit"
          v-model="gratitudeStore.newEntry"
          class="field"
          rows="4"
          maxlength="400"
          @input="nudge = ''"
        ></textarea>
        <p v-if="nudge" class="mt-1.5 text-[15px] text-danger" role="alert">{{ nudge }}</p>
      </div>
      <div class="flex gap-2.5">
        <button type="button" class="btn-ghost" @click="gratitudeStore.handleResetEntry">
          Cancel
        </button>
        <button
          type="button"
          class="btn-primary flex-1"
          :disabled="gratitudeStore.loading"
          @click="save"
        >
          Save changes
        </button>
      </div>
      <button
        type="button"
        class="flex h-11 items-center justify-center gap-2 text-[15px] font-semibold text-danger"
        @click="showDeleteModal = true"
      >
        <TrashIcon class="size-5" aria-hidden="true" />
        Delete
      </button>
    </div>
  </CommonSheet>

  <GratitudeConfirmationModal
    :is-open="showDeleteModal"
    :loading="gratitudeStore.loading"
    @confirm="handleDeleteConfirm"
    @cancel="handleDeleteCancel"
  />
</template>

<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";

const gratitudeStore = useGratitudeStore();
const showDeleteModal = ref(false);
const nudge = ref("");

const save = async () => {
  if (!gratitudeStore.newEntry.trim()) {
    nudge.value = "Write a few words first, or delete this entry.";
    return;
  }
  await gratitudeStore.submitEditedEntry();
};

const handleDeleteConfirm = async () => {
  await gratitudeStore.deleteEntry();
  showDeleteModal.value = false;
};

const handleDeleteCancel = () => {
  showDeleteModal.value = false;
};
</script>
