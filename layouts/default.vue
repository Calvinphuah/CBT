<template>
  <div
    class="min-h-screen bg-page text-ink md:grid md:grid-cols-[248px_minmax(0,1fr)]"
  >
    <NavigationDesktop />

    <main class="min-w-0 pb-24 md:pb-0">
      <slot />
    </main>

    <NavigationMobile />
    <NavigationAccountSheet />
  </div>
</template>

<script setup lang="ts"></script>
