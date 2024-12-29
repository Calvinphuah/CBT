<template>
  <div class="w-full mb-4 md:mb-0">
    <!-- Header Section -->
    <h1 class="mb-6 text-2xl font-bold text-center"></h1>

    <div>
      <CommonCard :cards="cards" />
      <!-- <MobileNav /> -->
    </div>

    <div class="hidden md:block">
      desktop
      <!-- Desktop layout -->
      <!-- Desktop specific markup -->
    </div>
    <div class="block md:hidden">
      mobile
      <!-- Mobile layout -->
      <!-- Mobile specific markup -->
    </div>

    <!-- Responsive Cards Layout -->
    <!-- <div
      class="flex flex-col gap-4 px-4 md:flex-row md:justify-center md:items-start md:px-4"
    >
      <CommonCard
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        image="../../assets/images/meditate.png"
        :link="card.link"
      >
        <p class="mt-3 text-gray-600">{{ card.description }}</p>
      </CommonCard>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    title: "Cognitive Behavioural Therapy",
    description: "Combat your negative thoughts and ruminations.",
    time: "8 min",
    link: "/cbt",
    image: "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
  },
  {
    title: "Gratitude Exercise",
    description: "Practice gratitude for the good things in your life",
    time: "2 min",
    link: "/gratitude",
    image: "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
  },
  {
    title: "Breathing and Meditation",
    description: "Calm your mind and body with guided breathing exercises.",
    time: "5 min",
    link: "/breathing",
    image: "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
  },
];
</script>

<style scoped></style>
