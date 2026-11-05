<template>
  <!-- -mb-24 cancels the layout's bottom-nav padding; the nav is hidden here, so the page fits one screen -->
  <div
    class="app-page -mb-24 flex min-h-[100dvh] flex-col gap-5 pb-0 md:mb-0 md:min-h-screen md:max-w-[640px]"
    @keydown.meta.enter.prevent="goForward"
    @keydown.ctrl.enter.prevent="goForward"
  >
    <CBTTopNav
      :step="stepIndex + 1"
      :total="steps.length"
      :is-editing="cbtStore.isEditing"
      @close="handleClose"
    />

    <div v-if="restoredDraft" class="card flex items-center gap-3 px-4 py-3 ring-1 ring-rule" role="status">
      <p class="flex-1 text-[15px] text-ink-2">We kept what you wrote last time.</p>
      <button type="button" class="text-[15px] font-semibold underline underline-offset-4" @click="startFresh">
        Start fresh
      </button>
    </div>

    <button
      v-if="stepIndex === 1"
      type="button"
      class="card flex items-center gap-2.5 px-4 py-3 text-left ring-1 ring-rule"
      @click="stepIndex = 0"
    >
      <span class="min-w-0 flex-1">
        <span class="block text-[13px] font-semibold text-ink-3">What happened</span>
        <span class="block truncate text-[15px]">{{ cbtStore.formData.activating }}</span>
      </span>
      <span class="text-[13px] font-semibold text-ink-2">Edit</span>
    </button>

    <div
      v-if="style === 'companion' && isLastStep"
      class="flex items-center gap-2.5"
    >
      <span class="size-12 shrink-0 overflow-hidden rounded-full ring-[3px] ring-surface">
        <CommonIllustration alt="" />
      </span>
      <p class="rounded-[18px] rounded-bl-md bg-surface px-3.5 py-2.5 text-[15px] font-medium">
        Let&rsquo;s check that thought together.
      </p>
    </div>

    <div v-if="stepIndex >= 2" class="storm-card">
      <p class="card-label text-storm-label">
        <CloudIcon v-if="style === 'clearing'" class="size-4" aria-hidden="true" />
        {{ copy.thoughtLabel }}
      </p>
      <p class="text-[17px] font-medium leading-[25px]">
        {{ cbtStore.formData.beliefs }}
      </p>
    </div>

    <div>
      <h1 ref="heading" tabindex="-1" class="text-title outline-none">
        {{ currentStep.model === "dispute" ? copy.answerQuestion : currentStep.title }}
      </h1>
      <p id="cbt-step-help" class="mt-2 text-[17px] leading-[25px] text-ink-2">
        {{ currentStep.model === "dispute" ? copy.answerHelp : currentStep.help }}
      </p>
      <CommonHandNote v-if="currentStep.note" class="mt-2" :tilt="-3">
        {{ currentStep.note }}
      </CommonHandNote>
    </div>

    <div v-if="currentStep.chips" class="flex flex-wrap gap-2">
      <button
        v-for="chip in currentStep.chips"
        :key="chip.label"
        type="button"
        class="chip"
        :class="{ 'chip-on': isChipOn(chip.text) }"
        :aria-pressed="currentStep.model === 'consequentFeelings' ? isChipOn(chip.text) : undefined"
        @click="toggleChip(chip.text)"
      >
        {{ chip.label }}
      </button>
    </div>

    <CBTInputField
      :id="`cbt-${currentStep.model}`"
      ref="field"
      v-model="cbtStore.formData[currentStep.model]"
      :label="currentStep.title"
      :placeholder="currentStep.placeholder"
      :tone="currentStep.model === 'dispute' ? 'sky' : 'plain'"
      :described-by="nudge ? 'cbt-step-help cbt-step-nudge' : 'cbt-step-help'"
      @update:model-value="nudge = ''"
    />

    <p v-if="nudge" id="cbt-step-nudge" class="-mt-2 text-[15px] text-ink-2" role="status">
      {{ nudge }}
    </p>

    <div v-if="currentStep.example">
      <button
        type="button"
        class="-my-3 py-3 text-[15px] font-semibold underline decoration-storm-label underline-offset-4"
        :aria-expanded="showExample"
        @click="showExample = !showExample"
      >
        {{ showExample ? "Hide the example" : "See an example" }}
      </button>
      <p v-if="showExample" class="mt-2 text-[15px] italic text-ink-2">
        {{ currentStep.example }}
      </p>
    </div>

    <div class="flex-1 md:hidden" />

    <div
      class="sticky bottom-0 -mx-5 flex gap-2.5 bg-page px-5 pt-3 md:static md:mx-0 md:bg-transparent md:px-0 md:pt-1"
      :style="{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }"
    >
      <button
        v-if="stepIndex > 0"
        type="button"
        class="btn-ghost"
        @click="goBack"
      >
        Back
      </button>
      <button
        v-if="!isLastStep"
        type="button"
        class="btn-primary flex-1"
        @click="goForward"
      >
        Next
      </button>
      <button
        v-else
        type="button"
        class="btn-sun flex-1"
        :disabled="isSaving"
        @click="goForward"
      >
        {{ saveLabel }}
      </button>
    </div>
  </div>

  <CommonSheet
    :open="showDiscard"
    title="Discard this record?"
    @close="showDiscard = false"
  >
    <p class="text-[17px] leading-[25px] text-ink-2">
      What you&rsquo;ve written so far won&rsquo;t be saved.
    </p>
    <div class="mt-5 flex flex-col gap-2.5">
      <button type="button" class="btn-primary w-full" @click="showDiscard = false">
        Keep writing
      </button>
      <button type="button" class="btn-ghost w-full text-danger" @click="discard">
        Discard
      </button>
    </div>
  </CommonSheet>
</template>

<script setup lang="ts">
import { CloudIcon } from "@heroicons/vue/24/outline";

// Read by CBTView to show the saved screen. Set before saving, because saving closes this form.
const savedClearerView = useState("cbt-saved-clearer-view", () => "");

const cbtStore = useCBTStore();
const { style, copy } = useAppStyle();

interface Chip {
  label: string;
  text: string;
}

interface Step {
  model: "activating" | "beliefs" | "consequentFeelings" | "dispute";
  title: string;
  help: string;
  placeholder: string;
  example?: string;
  note?: string;
  chips?: Chip[];
}

const steps: Step[] = [
  {
    model: "activating",
    title: "What happened?",
    help: "Just the facts. Where were you, and what set it off?",
    placeholder: "A friend hasn’t replied to my message yet.",
    note: "like a camera would see it",
    example: "My plans for tonight got cancelled at the last minute.",
  },
  {
    model: "beliefs",
    title: "What went through your mind?",
    help: "Write the thought word for word, the way it sounded in your head.",
    placeholder: "They must be upset with me.",
    example:
      "“I’m not smart enough.” “Everyone will laugh at me.” “I always mess things up.”",
  },
  {
    model: "consequentFeelings",
    title: "How did that make you feel?",
    help: "Name each feeling and how strong it was, out of 10.",
    placeholder: "Worried, 6 out of 10. Restless.",
    chips: ["Anxious", "Sad", "Angry", "Ashamed", "Guilty", "Hopeless", "Lonely"].map(
      (feeling) => ({ label: feeling, text: feeling })
    ),
  },
  {
    model: "dispute",
    title: "What’s the clearer view?",
    help: "What doesn’t quite fit the thought? What would you tell a friend who said it?",
    placeholder: "They often reply late when they’re busy.",
    note: "what would you tell a friend?",
    chips: [
      { label: "Evidence against it", text: "One thing that doesn’t fit the thought:" },
      { label: "A friend’s view", text: "If a friend said this, I’d tell them:" },
      { label: "Last time", text: "Last time I worried about this," },
    ],
  },
];

const stepIndex = ref(0);
const showExample = ref(false);
const showDiscard = ref(false);
const isSaving = ref(false);
const isSlowSave = ref(false);
const restoredDraft = ref(false);
const nudge = ref("");
const field = ref<{ focus: () => void } | null>(null);
const heading = ref<HTMLElement | null>(null);

const currentStep = computed(() => steps[stepIndex.value]);
const isLastStep = computed(() => stepIndex.value === steps.length - 1);
const currentValue = computed(() => cbtStore.formData[currentStep.value.model] || "");
const saveLabel = computed(() => {
  if (isSaving.value) return isSlowSave.value ? "Still saving…" : "Saving…";
  return cbtStore.isEditing ? "Save changes" : copy.value.saveLabel;
});

// On phones, focusing without a tap pops the keyboard and shoves the page up
const autoFocusField = () => {
  if (!window.matchMedia("(pointer: fine) and (hover: hover)").matches) return;
  field.value?.focus();
};

// Each new step moves focus: the box on a computer, the question on a phone so screen readers read it.
const focusStep = () => {
  if (window.matchMedia("(pointer: fine) and (hover: hover)").matches) field.value?.focus();
  else heading.value?.focus();
};

watch(stepIndex, () => {
  showExample.value = false;
  nudge.value = "";
  nextTick(focusStep);
});

const isChipOn = (text: string) =>
  currentStep.value.model === "consequentFeelings" &&
  currentValue.value.toLowerCase().includes(text.toLowerCase());

const removeFeeling = (text: string) => {
  cbtStore.formData.consequentFeelings = currentValue.value
    .split(/,\s*/)
    .filter((part) => !part.toLowerCase().startsWith(text.toLowerCase()))
    .join(", ");
};

const toggleChip = (text: string) => {
  const model = currentStep.value.model;
  const value = currentValue.value.trim();
  if (model === "consequentFeelings" && isChipOn(text)) {
    removeFeeling(text);
    return;
  }

  const separator = model === "consequentFeelings" ? ", " : " ";
  cbtStore.formData[model] = value ? `${value}${separator}${text}` : text;
  if (model === "dispute") cbtStore.formData[model] += " ";
  nudge.value = "";
  field.value?.focus();
};

const goBack = () => {
  stepIndex.value = Math.max(0, stepIndex.value - 1);
};

const goForward = async () => {
  if (!currentValue.value.trim()) {
    nudge.value = "Write a few words first. Even a short answer helps.";
    field.value?.focus();
    return;
  }
  if (!isLastStep.value) {
    stepIndex.value += 1;
    return;
  }
  await save();
};

const save = async () => {
  if (cbtStore.isNewEntry) savedClearerView.value = cbtStore.formData.dispute.trim();
  isSaving.value = true;
  const slowTimer = setTimeout(() => (isSlowSave.value = true), 8000);
  try {
    await cbtStore.submitCurrentEntry();
    cbtStore.clearDraft();
  } catch (error) {
    savedClearerView.value = "";
    nudge.value = saveErrorMessage(error);
  } finally {
    clearTimeout(slowTimer);
    isSaving.value = false;
    isSlowSave.value = false;
  }
};

const hasText = () =>
  Object.values(cbtStore.formData).some((value) => value.trim().length > 0);

const handleClose = () => {
  if (cbtStore.isEditing) {
    cbtStore.cancelUpdateEntry();
    return;
  }
  if (hasText()) {
    showDiscard.value = true;
    return;
  }
  cbtStore.handleBackToList();
};

const discard = () => {
  showDiscard.value = false;
  cbtStore.clearDraft();
  cbtStore.handleBackToList();
};

const startFresh = () => {
  restoredDraft.value = false;
  cbtStore.clearDraft();
  cbtStore.resetForm();
  stepIndex.value = 0;
};

const saveDraft = useDebounceFn(() => cbtStore.saveDraft(stepIndex.value), 500);
watch([() => ({ ...cbtStore.formData }), stepIndex], saveDraft);

onMounted(async () => {
  if (cbtStore.isNewEntry) {
    const draftStep = await cbtStore.loadDraft();
    if (draftStep !== null) {
      stepIndex.value = draftStep;
      restoredDraft.value = true;
    }
  }
  autoFocusField();
});
</script>
