<template>
  <div class="max-w-lg mx-auto font-sans text-lg text-gray-800">
    <!-- Header -->
    <h2 class="px-4">Take a moment for yourself</h2>
    <!-- Cards -->
    <div class="flex flex-col max-w-xl gap-6 p-4 pb-28">
      <LandingCard v-for="card in cards" :key="card.id" :card="card" />
      <!-- <LandingCardWhite v-for="card in cards" :key="card.id" :card="card" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    id: 1,
    title: "Cognitive Behavioral Therapy",
    time: "8 min",
    image: "/img/landing-cbt.png",
    color: "bg-accent-orange",
    imageWidth: 171,
    imageHeight: 156,
    marginLeft: 110,
    link: "/cbt",
  },
  {
    id: 2,
    title: "Gratitude Journal",
    time: "3 min",
    image: "/img/landing-gratitude.png",
    color: "bg-accent-yellow",
    imageWidth: 200,
    imageHeight: 190,
    marginLeft: 50,
    link: "/gratitude",
  },
  {
    id: 3,
    title: "Meditation",
    time: "10 min",
    image: "/img/landing-meditation.png",
    color: "bg-accent-blue",
    imageWidth: 156,
    imageHeight: 146,
    marginLeft: 120,
    link: "/meditation",
  },
];
</script>

<style scoped></style>
