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
        <p v-if="nudge" class="mt-1.5 text-[15px] text-ink-2" role="status">{{ nudge }}</p>
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
    :error="deleteError"
    @confirm="handleDeleteConfirm"
    @cancel="handleDeleteCancel"
  />
</template>

<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";

const gratitudeStore = useGratitudeStore();
const showDeleteModal = ref(false);
const nudge = ref("");
const deleteError = ref("");

const save = async () => {
  if (!gratitudeStore.newEntry.trim()) {
    nudge.value = "Write a few words first, or delete this entry.";
    return;
  }
  try {
    await gratitudeStore.submitEditedEntry();
  } catch (error) {
    nudge.value = saveErrorMessage(error);
  }
};

const handleDeleteConfirm = async () => {
  deleteError.value = "";
  try {
    await gratitudeStore.deleteEntry();
    handleDeleteCancel();
  } catch (error) {
    deleteError.value = deleteErrorMessage(error);
  }
};

const handleDeleteCancel = () => {
  showDeleteModal.value = false;
  deleteError.value = "";
};
</script>
