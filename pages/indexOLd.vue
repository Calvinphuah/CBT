<template>
  <div class="w-full px-5 mb-4 md:mb-0">
    <h2 class="p-4 px-5 mb-6 text-3xl font-bold text-center text-indigo-600">
      Welcome to Cogni
    </h2>

    <!-- Header Section -->
    <h1 class="text-lg font-bold text-center text-gray-800">
      Hello, {{ auth.user?.displayName || "there" }}!
    </h1>
    <p class="mt-2 text-center text-gray-600">
      We’re thrilled to have you here. Let's take the first step toward a
      simpler and happier you.
    </p>

    <!-- Common Cards -->
    <div class="mt-6 mb-24">
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
