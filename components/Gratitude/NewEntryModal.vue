<template>
  <CommonSheet
    :open="gratitudeStore.isNewEntry"
    label="What went well today?"
    @close="gratitudeStore.handleResetEntry"
  >
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
        <p v-if="nudge" class="mt-1.5 text-[15px] text-ink-2" role="status">{{ nudge }}</p>
        <p v-else-if="idea" class="mt-1.5 text-[15px] text-ink-2">
          Idea: {{ idea }}
          <button type="button" class="font-semibold underline underline-offset-4" @click="useIdea">
            Use it
          </button>
        </p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-[13px] text-ink-3">Small things count.</p>
        <button
          type="button"
          class="flex h-11 items-center gap-1.5 text-[15px] font-semibold"
          @click="showIdea"
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
const idea = ref("");

watch(
  () => gratitudeStore.isNewEntry,
  () => (idea.value = "")
);

// Fills an empty box, but never replaces what someone already wrote.
const showIdea = () => {
  const nextIdea = gratitudeStore.randomGratitudeIdea();
  if (gratitudeStore.newEntry.trim()) {
    idea.value = nextIdea;
    return;
  }
  gratitudeStore.newEntry = nextIdea;
};

const useIdea = () => {
  gratitudeStore.newEntry = idea.value;
  idea.value = "";
};

const save = async () => {
  if (!gratitudeStore.newEntry.trim()) {
    nudge.value = "Write a few words first.";
    return;
  }
  try {
    await gratitudeStore.addEntry(gratitudeStore.newEntry);
  } catch (error) {
    nudge.value = saveErrorMessage(error);
  }
};
</script>
