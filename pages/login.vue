<template>
  <div
    class="flex min-h-[100dvh] flex-col bg-page text-ink md:grid md:grid-cols-2"
  >
    <LoginLeftSide />
    <LoginRightSide />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({ title: "Sign in" });
</script>
