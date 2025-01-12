<template>
  <div
    class="flex flex-col items-center min-h-screen px-4 py-6 bg-gradient-to-b from-purple-100 to-blue-50"
  >
    <!-- Header Section -->
    <header class="w-full max-w-4xl mt-8 mb-8 text-center">
      <h1 class="text-2xl font-semibold text-gray-800 md:text-3xl">
        Good morning, {{ authStore.user?.displayName || "Guest" }}.
      </h1>
      <p class="mt-2 text-sm text-gray-600 md:text-lg">
        We’re thrilled to have you here. Let's take the first step toward a
        simpler and happier you.
      </p>
    </header>

    <!-- Cards Section -->
    <div class="w-full max-w-4xl">
      <!-- Mindfulness Section -->
      <h3 class="mb-4 text-lg font-semibold text-gray-700 md:text-xl">
        Mindfulness
      </h3>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LandingCard
          v-for="(card, index) in mindfulnessCards"
          :key="index"
          :card="card"
        />
      </div>

      <!-- Journaling Section -->
      <h3 class="mt-8 mb-4 text-lg font-semibold text-gray-700 md:text-xl">
        Journaling
      </h3>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LandingCard
          v-for="(card, index) in journalingCards"
          :key="index"
          :card="card"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const mindfulnessCards = [
  {
    title: "Cognitive Behavioural Therapy",
    description: "Combat your negative thoughts and ruminations.",
    time: "8 min",
    link: "/cbt",
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

const journalingCards = [
  {
    title: "Gratitude Exercise",
    description: "Practice gratitude for the good things in your life.",
    time: "2 min",
    link: "/gratitude",
    image: "/img/meditate.png",
  },
];
</script>
