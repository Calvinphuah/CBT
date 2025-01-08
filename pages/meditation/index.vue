<template>
  <div>
    <MeditationCard :cards="cards" />
  </div>
  <!-- Credits
The guided meditation in this app are from "Mindful meditation," created by Diana Winston and others for UCLA Mindful, ©2011–2024 The Regents of the University of California (The UC Regents).
Licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.
No changes have been made to the original content. -->
</template>

<script setup lang="ts">
const cards = [
  {
    id: "breathing-meditation",
    title: "Breathing Meditation",
    description:
      "A meditation to help combat negative thoughts and ruminations.",
    time: "5 mins",
    link: "/meditation/breathing-meditation",
    audioSrc: "/audio/breathing-meditation.mp3",
  },
  {
    id: "breath-sound-body-meditation",
    title: "Breath, Sound, Body Meditation",
    description:
      "A guided meditation focusing on breath, sound, and body awareness.",
    time: "12 mins",
    link: "/meditation/breath-sound-body-meditation",
    audioSrc: "/audio/breath-sound-body-meditation.mp3",
  },
  {
    id: "complete-meditation-instructions",
    title: "Complete Meditation Instructions",
    description: "Comprehensive guidance for a complete meditation practice.",
    time: "19 mins",
    link: "/meditation/complete-meditation-instructions",
    audioSrc: "/audio/complete-meditation-instructions.mp3",
  },
  {
    id: "working-with-difficulties",
    title: "Meditation for Working with Difficulties",
    description:
      "Learn techniques to navigate challenging emotions and situations.",
    time: "7 mins",
    link: "/meditation/working-with-difficulties",
    audioSrc: "/audio/meditation-working-with-difficulties.mp3",
  },
  {
    id: "loving-kindness-meditation",
    title: "Loving Kindness Meditation",
    description: "Cultivate love and compassion for yourself and others.",
    time: "9 mins",
    link: "/meditation/loving-kindness-meditation",
    audioSrc: "/audio/loving-kindness-meditation.mp3",
  },
  {
    id: "body-and-sound-meditation",
    title: "Body and Sound Meditation",
    description: "A short meditation for body and sound awareness.",
    time: "3 mins",
    link: "/meditation/body-and-sound-meditation",
    audioSrc: "/audio/body-and-sound-meditation.mp3",
  },
  {
    id: "short-body-scan",
    title: "Short Body Scan",
    description: "A brief body scan to relax and refocus.",
    time: "3 mins",
    link: "/meditation/short-body-scan",
    audioSrc: "/audio/short-body-scan.mp3",
  },
  {
    id: "body-scan-for-sleep",
    title: "Body Scan for Sleep",
    description: "Guided body scan to help you relax and prepare for sleep.",
    time: "13 mins",
    link: "/meditation/body-scan-for-sleep",
    audioSrc: "/audio/body-scan-for-sleep.mp3",
  },
];
</script>

<style scoped></style>
