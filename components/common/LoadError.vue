<template>
  <div class="card flex flex-col gap-3 p-5 ring-1 ring-line" role="status">
    <p class="text-[17px] font-semibold">Couldn&rsquo;t load your {{ what }}</p>
    <p class="text-[15px] leading-[21px] text-ink-2">
      They&rsquo;re safe. Check your connection, then try again.
    </p>
    <button type="button" class="btn-ghost" @click="emit('retry')">Try again</button>
  </div>
</template>

<script setup lang="ts">
// Shown instead of an empty state when a list fails to load, so nobody thinks their entries are gone.
defineProps<{ what: string }>();

const emit = defineEmits<{ (e: "retry"): void }>();
</script>
