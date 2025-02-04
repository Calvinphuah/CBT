<template>
  <div class="pb-24 text-gray-800 md:pb-0">
    <!-- Hero Section -->
    <section class="flex items-center justify-center min-h-screen px-4 py-16">
      <div
        class="grid items-center max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2"
      >
        <!-- Text Content -->
        <div class="space-y-6">
          <h1
            class="text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
          >
            Cognitive Behavioural Therapy
          </h1>
          <p class="text-lg leading-relaxed text-gray-700">
            Cognitive Behavioral Therapy (CBT) is a proven, structured approach
            to managing and overcoming mental health challenges. It focuses on
            identifying and changing negative thought patterns and behaviors to
            promote healthier emotional responses.
          </p>
          <NuxtLink
            to="/cbt"
            class="inline-block px-6 py-2 transition rounded-full bg-accent-orange"
          >
            Start now
          </NuxtLink>
          <button
            class="inline-block px-6 py-2 ml-4 transition rounded-full bg-accent-orange"
          >
            <a href="/pdf/cbt_exercise.pdf" download>PDF Template</a>
          </button>
        </div>

        <!-- Illustration -->
        <div class="flex justify-center">
          <img
            src="/img/landing-cbt.png"
            alt="Mental Health Illustration"
            class="w-full max-w-md"
          />
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section class="px-4 py-12 md:px-8">
      <h2 class="mb-4 text-3xl font-bold text-center text-gray-800">
        Take a Step Towards Mental Wellness
      </h2>
      <p class="mb-8 text-center text-gray-600">
        Choose an activity to improve your mental well-being.
      </p>
      <div
        class="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3"
      >
        <LandingCard v-for="card in cards" :key="card.id" :card="card" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    id: 1,
    title: "Cognitive Behavioural Therapy",
    description:
      "Feeling anxious, can't switch off or your thoughts are racing?",
    time: "8 min",
    image: "/img/landing-cbt.png",
    color: "bg-accent-orange",
    link: "/cbt",
  },
  {
    id: 2,
    title: "Gratitude Exercise",
    description:
      "Feeling anxious, can't switch off or your thoughts are racing?",
    time: "5 min",
    image: "/img/landing-gratitude.png",
    color: "bg-accent-yellow",
    link: "/gratitude",
  },
  {
    id: 3,
    title: "Meditation",
    description:
      "Feeling anxious, can't switch off or your thoughts are racing?",
    time: "10 min",
    image: "/img/landing-meditation.png",
    color: "bg-accent-blue",
    link: "/meditation",
  },
];
</script>
