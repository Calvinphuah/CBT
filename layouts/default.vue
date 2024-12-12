<template>
  <header class="">
    <div class="p-4 flex justify-between items-center">
      <!--  Logo -->
      <CommonLogo />

      <!-- Navigation -->
      <div class="flex gap-4">
        <NuxtLink to="/landing"
          ><span class="hover:text-white">hi</span></NuxtLink
        >
        <NuxtLink to="/cbt" class="hover:text-blue-500">CBT</NuxtLink>
        <NuxtLink to="/breathing" class="hover:text-blue-500"
          >breathing</NuxtLink
        >
      </div>

      <!-- Logout Button -->
      <div>
        <button type="button" @click="logout">Logout</button>
      </div>
    </div>
  </header>
  <slot />
</template>

<script setup lang="ts">
const { logout } = useAuth();
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
