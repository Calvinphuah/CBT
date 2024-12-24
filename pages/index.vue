<template>
  <div class="w-full mb-4 md:mb-0">
    <!-- Header Section -->
    <h1 class="mb-6 text-2xl font-bold text-center"></h1>

    <div>
      <CommonCard :cards="cards" />
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
// const cards = [
//   {
//     title: "Cognitive Behavioural Therapy",
//     image: "../../assets/images/meditate.png",
//     description: "Engage in exercises to calm your thoughts and emotions.",
//     link: "/cbt",
//   },
//   {
//     title: "Gratitude",
//     image: "../../assets/images/meditate.png",
//     description: "Keep track of your daily thoughts and feelings.",
//     link: "/gratitude",
//   },
//   {
//     title: "Breathing Exercise",
//     image: "../../assets/images/meditate.png",
//     description: "Explore guided sessions for mindfulness and therapy.",
//     link: "/breathing",
//   },
// ];

const cards = [
  {
    title: "Your morning meditation",
    description: "an exclusive meditation each day for you!",
    bgColor: "bg-sky-200",
    time: "8 min",
    link: "/cbt",
    image: "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
  },
  {
    title: "Check-in & journal",
    description: "how are you feeling today?",
    bgColor: "bg-amber-100",
    time: "2 min",
    link: "/cbt",
    image: "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
  },
  {
    title: "Surprise me!",
    description: "brighten up your day with our surprise",
    bgColor: "bg-green-100",
    time: "5 min",
    link: "/cbt",
    image: "https://cdn.pixabay.com/photo/2024/04/19/22/25/man-8707406_640.png",
  },
];
</script>

<style scoped></style>
