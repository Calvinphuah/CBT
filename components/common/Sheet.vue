<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div
        v-if="open"
        class="fixed inset-0 z-[200] flex items-end justify-center md:items-center md:p-6"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
      >
        <div
          class="absolute inset-0 bg-black/45"
          aria-hidden="true"
          @click="emit('close')"
        />
        <div
          class="sheet-panel relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-sheet bg-page px-5 pt-2.5 md:rounded-sheet md:px-7 md:pt-7"
          :style="{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }"
        >
          <span
            class="mx-auto mb-4 block h-[5px] w-[38px] rounded-full bg-rule md:hidden"
            aria-hidden="true"
          />
          <h2 v-if="title" :id="titleId" class="text-title mb-2 text-[24px]">
            {{ title }}
          </h2>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { open, title = "" } = defineProps<{ open: boolean; title?: string }>();
const emit = defineEmits<{ (e: "close"): void }>();

const titleId = useId();

// Keep the page behind still while the sheet is open.
const isBodyLocked = useScrollLock(import.meta.client ? document.body : null);
watch(
  () => open,
  (isOpen) => {
    isBodyLocked.value = isOpen;
  },
  { immediate: true }
);
onBeforeUnmount(() => {
  isBodyLocked.value = false;
});

useEventListener("keydown", (event: KeyboardEvent) => {
  if (open && event.key === "Escape") emit("close");
});
</script>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-enter-active .sheet-panel,
.sheet-leave-active .sheet-panel {
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from .sheet-panel,
.sheet-leave-to .sheet-panel {
  transform: translateY(32px);
}
</style>
