<template>
  <nav class="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
    <div class="flex justify-around max-w-md mx-auto">
      <NuxtLink
        to="/cbt"
        class="flex flex-col items-center text-xs text-gray-600"
      >
        <!-- <AcademicCapIcon class="w-6 h-6 mb-1" /> -->
        <span>CBT</span>
      </NuxtLink>
      <NuxtLink
        to="/gratitude"
        class="flex flex-col items-center text-xs text-gray-600"
      >
        <!-- <HeartIcon class="w-6 h-6 mb-1" /> -->
        <span>Gratitude</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup></script>
