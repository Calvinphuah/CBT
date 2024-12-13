<template>
  <div>
    <header class="">
      <div class="p-4 flex justify-between items-center">
        <!--  Logo -->
        <CommonLogo />

        <!-- Navigation -->
        <div class="flex gap-4">
          <NuxtLink to="/landing"
            ><span class="hover:text-white">hi</span></NuxtLink
          >
          <NuxtLink to="/loginTest" class="hover:text-blue-500"
            >loginTest</NuxtLink
          >
          <NuxtLink to="/signup" class="hover:text-blue-500">Signup</NuxtLink>
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
