<template>
  <div
    class="min-h-screen bg-page text-ink md:grid md:grid-cols-[248px_minmax(0,1fr)]"
  >
    <a
      href="#main"
      class="sr-only z-[400] rounded-xl bg-surface px-4 py-3 font-semibold focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >Skip to content</a
    >
    <NavigationDesktop />

    <main id="main" tabindex="-1" class="min-w-0 pb-24 outline-none md:pb-0">
      <slot />
    </main>

    <NavigationMobile />
    <NavigationAccountSheet />
  </div>
</template>

<script setup lang="ts"></script>
