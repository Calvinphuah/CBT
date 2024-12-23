<template>
  <div>
    <header class="">
      <div class="p-4 flex justify-between items-center">
        <!--  Logo -->
        <CommonLogo />

        <!-- Navigation -->
        <div class="flex gap-4">
          <NuxtLink to="/cbt"
            ><span class="hover:text-blue-500">CBT</span></NuxtLink
          >
          <NuxtLink to="/gratitude" class="hover:text-blue-500"
            >Gratitude</NuxtLink
          >
          <NuxtLink to="/breathing" class="hover:text-blue-500"
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
