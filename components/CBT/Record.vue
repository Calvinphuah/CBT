<template>
  <div class="app-page flex flex-col gap-5 md:max-w-[640px]">
    <div class="flex h-11 items-center justify-between">
      <button
        type="button"
        class="-ml-1.5 flex h-11 items-center gap-0.5 pr-2 text-[17px] font-semibold"
        @click="cbtStore.handleBackToList"
      >
        <ChevronLeftIcon class="size-6" aria-hidden="true" />
        Thoughts
      </button>
      <button
        type="button"
        class="icon-btn"
        aria-label="Record options"
        @click="showOptions = true"
      >
        <EllipsisHorizontalIcon class="size-7" aria-hidden="true" />
      </button>
    </div>

    <div v-if="createdAt">
      <h1 class="text-title">{{ dateHeading }}</h1>
      <p class="mt-0.5 text-[15px] text-ink-3">{{ timeLabel }}</p>
    </div>

    <section>
      <h2 class="text-[13px] font-semibold text-ink-3">What happened</h2>
      <p class="mt-1 text-[17px] leading-[25px]">{{ cbtStore.formData.activating }}</p>
    </section>

    <section class="storm-card">
      <h2 class="card-label text-storm-label">
        <CloudIcon class="size-4" aria-hidden="true" />
        The storm
      </h2>
      <p class="text-[17px] font-medium leading-[25px]">{{ cbtStore.formData.beliefs }}</p>
    </section>

    <section>
      <h2 class="text-[13px] font-semibold text-ink-3">How it felt</h2>
      <p class="mt-1 text-[17px] leading-[25px]">
        {{ cbtStore.formData.consequentFeelings }}
      </p>
    </section>

    <section class="clear-card">
      <h2 class="card-label text-ink-2">
        <SunIcon class="size-4 text-ink" aria-hidden="true" />
        The clearer view
      </h2>
      <p class="text-[17px] font-medium leading-[25px]">{{ cbtStore.formData.dispute }}</p>
    </section>
  </div>

  <CommonSheet :open="showOptions" @close="showOptions = false">
    <div class="card px-4">
      <button
        type="button"
        class="flex min-h-14 w-full items-center gap-3.5 border-b border-rule"
        @click="editRecord"
      >
        <PencilIcon class="size-6 text-ink-2" aria-hidden="true" />
        <span class="text-[17px] font-medium">Edit record</span>
      </button>
      <button
        type="button"
        class="flex min-h-14 w-full items-center gap-3.5 text-danger"
        @click="askDelete"
      >
        <TrashIcon class="size-6" aria-hidden="true" />
        <span class="text-[17px] font-semibold">Delete record</span>
      </button>
    </div>
  </CommonSheet>

  <CBTDeleteModal
    :is-open="showDeleteModal"
    :loading="cbtStore.loading"
    @confirm="handleDeleteConfirm"
    @cancel="showDeleteModal = false"
  />
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
  CloudIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  SunIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const cbtStore = useCBTStore();

const showOptions = ref(false);
const showDeleteModal = ref(false);

const createdAt = computed(() => cbtStore.selectedEntry?.createdAt.toDate());
const dateHeading = computed(() =>
  createdAt.value?.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
);
const timeLabel = computed(() =>
  createdAt.value
    ?.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase()
);

const editRecord = () => {
  showOptions.value = false;
  cbtStore.handleUpdateEntry();
};

const askDelete = () => {
  showOptions.value = false;
  showDeleteModal.value = true;
};

const handleDeleteConfirm = async () => {
  await cbtStore.deleteEntry();
  showDeleteModal.value = false;
};
</script>
