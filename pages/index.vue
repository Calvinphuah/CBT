<template>
  <div class="w-full mb-4 md:mb-0">
    <!-- Header Section -->
    <h1 class="mb-6 text-2xl font-bold text-center">
      How are you today, {{ auth.user?.displayName }}?
    </h1>

    <div>
      <CommonCard :cards="cards" />
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    title: "Cognitive Behavioural Therapy",
    description: "Combat your negative thoughts and ruminations.",
    time: "8 min",
    link: "/cbt",
    image: "/img/meditate.png",
  },
  {
    title: "Gratitude Exercise",
    description: "Practice gratitude for the good things in your life",
    time: "2 min",
    link: "/gratitude",
    image: "/img/meditate.png",
  },
  {
    title: "Breathing and Meditation",
    description: "Calm your mind and body with guided breathing exercises.",
    time: "5 min",
    link: "/meditation",
    image: "/img/meditate.png",
  },
];

const auth = useAuthStore();
</script>

<style scoped></style>
