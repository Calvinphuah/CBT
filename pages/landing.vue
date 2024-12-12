<template>
  <div class="w-full mb-4 md:mb-0">
    <!-- Header Section -->
    <h1 class="text-2xl font-bold mb-6 text-center">
      Welcome, {{ user?.displayName }}
    </h1>

    <!-- Responsive Cards Layout -->
    <div
      class="flex flex-col md:flex-row md:justify-center md:items-start gap-4 px-4 md:px-4"
    >
      <CommonCard
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        image="../../assets/images/meditate.png"
        :link="card.link"
      >
        <p class="text-gray-600 mt-3">{{ card.description }}</p>
      </CommonCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { user } = useAuth();

const cards = [
  {
    title: "Cognitive Behavioural Therapy",
    image: "../../assets/images/meditate.png",
    description: "Engage in exercises to calm your thoughts and emotions.",
    link: "/cbt",
  },
  {
    title: "Gratitude",
    image: "../../assets/images/meditate.png",
    description: "Keep track of your daily thoughts and feelings.",
    link: "/gratitude",
  },
  {
    title: "Breathing Exercise",
    image: "../../assets/images/meditate.png",
    description: "Explore guided sessions for mindfulness and therapy.",
    link: "/breathing",
  },
];
</script>

<style scoped></style>
