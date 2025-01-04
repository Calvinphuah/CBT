<template>
  <GratitudeNewEntryModal v-if="gratitudeStore.isNewEntry" class="p-4" />
  <GratitudeEditEntryModal v-if="gratitudeStore.isEditing" class="p-4" />

  <div class="h-full px-4 py-6 space-y-4 overflow-y-auto">
    <GratitudeCard
      v-for="entry in gratitudeStore.gratitudeEntries"
      :key="entry.id"
      :date="entry.createdAt"
      :content="entry.entry"
      @click="gratitudeStore.handleEditEntry(entry)"
    />

    <!-- Loading spinner -->
    <div v-if="gratitudeStore.loading" class="flex justify-center p-4">
      <div
        class="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"
      ></div>
    </div>

    <!-- Sentinel element for IntersectionObserver -->
    <div v-if="!gratitudeStore.allLoaded" ref="sentinel" class="h-4"></div>

    <!-- All loaded message -->
    <div v-else class="p-4 text-center text-gray-500">All entries loaded</div>
  </div>
</template>

<script setup lang="ts">
const gratitudeStore = useGratitudeStore();
const sentinel = ref<HTMLElement | null>(null);

// Setup intersection observer
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !gratitudeStore.loading &&
        !gratitudeStore.allLoaded
      ) {
        gratitudeStore.fetchEntries(true);
        console.log("Loading more");
      }
    },
    {
      rootMargin: "100px", // Start loading before element is visible
      threshold: 0.1,
    }
  );

  if (sentinel.value) {
    observer.observe(sentinel.value);
  }

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});

// Initial load
await gratitudeStore.fetchEntries();
</script>
