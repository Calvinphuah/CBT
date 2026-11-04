<template>
  <CommonSheet :open="gratitudeStore.isNewEntry" @close="gratitudeStore.handleResetEntry">
    <div class="flex flex-col gap-4">
      <h2 class="text-title text-[24px]">What went well today?</h2>
      <div>
        <label for="gratitude-new" class="sr-only">What went well today?</label>
        <textarea
          id="gratitude-new"
          v-model="gratitudeStore.newEntry"
          class="field"
          rows="4"
          maxlength="400"
          placeholder="The barista remembered my order."
          @input="nudge = ''"
        ></textarea>
        <p v-if="nudge" class="mt-1.5 text-[15px] text-danger" role="alert">{{ nudge }}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-[13px] text-ink-3">Small things count.</p>
        <button
          type="button"
          class="flex h-11 items-center gap-1.5 text-[15px] font-semibold"
          @click="gratitudeStore.generateGratitudeEntry"
        >
          <SparklesIcon class="size-5 text-sun-icon" aria-hidden="true" />
          Need an idea?
        </button>
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
          {{ gratitudeStore.loading ? "Saving…" : "Save" }}
        </button>
      </div>
    </div>
  </CommonSheet>
</template>

<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/outline";

const gratitudeStore = useGratitudeStore();
const nudge = ref("");

const save = async () => {
  if (!gratitudeStore.newEntry.trim()) {
    nudge.value = "Write a few words first.";
    return;
  }
  await gratitudeStore.addEntry(gratitudeStore.newEntry);
};
</script>
