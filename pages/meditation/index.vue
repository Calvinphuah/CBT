<template>
  <div class="app-page flex flex-col gap-4">
    <MeditationTopNav />
    <MeditationList :cards="cards" />
    <!-- Credits -->
    <footer class="pt-2 text-[11px] leading-4 text-ink-3">
      The guided meditation in this app are from "Mindful meditation," created
      by Diana Winston and others for UCLA Mindful, ©2011–2024 The Regents of
      the University of California (The UC Regents). Licensed under the Creative
      Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
      No changes have been made to the original content.
    </footer>
  </div>
</template>

<script setup lang="ts">
const cards = MEDITATIONS;

useHead({
  title: "Meditation",
});
</script>

<style scoped></style>
