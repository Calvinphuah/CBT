<template>
  <div>
    <header class="">
      <div class="p-4 flex justify-between items-center">
        <!--  Logo -->
        <CommonLogo />

        <!-- Navigation -->
        <div class="flex gap-4">
          <NuxtLink to="/cbt" active-class="text-orange-600">CBT</NuxtLink>
          <NuxtLink to="/gratitude" active-class="text-orange-600"
            >Gratitude</NuxtLink
          >
          <NuxtLink to="/breathing" active-class="text-orange-600"
            >Breathing</NuxtLink
          >
        </div>

        <!-- Logout Button -->
        <HideFromGuest>
          <div>
            <button type="button" @click="handleLogout">Logout</button>
          </div></HideFromGuest
        >
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
