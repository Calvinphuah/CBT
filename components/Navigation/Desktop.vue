<template>
  <nav class="bg-gray-800">
    <div class="px-2 mx-auto sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Logo, Title, and Navigation -->
        <div class="flex items-center flex-1 sm:justify-start">
          <!-- Logo and Title -->
          <NuxtLink to="/" class="flex items-center">
            <img
              class="w-auto h-8"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
              alt="Cogni Logo"
            />
            <span class="ml-2 text-lg font-semibold text-white sm:text-xl"
              >Cogni</span
            >
          </NuxtLink>
          <!-- Navigation Links -->
          <div class="hidden ml-6 space-x-4 md:block">
            <NuxtLink
              to="/"
              class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/cbt"
              class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              CBT
            </NuxtLink>
            <NuxtLink
              to="/gratitude"
              class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              Gratitude
            </NuxtLink>
            <NuxtLink
              to="/meditation"
              class="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              Meditation
            </NuxtLink>
          </div>
        </div>

        <!-- Profile and Notifications -->
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="relative ml-3">
            <button
              type="button"
              class="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              @click="toggleProfileMenu"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="rounded-full size-8"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
              />
            </button>
            <div
              v-show="isProfileMenuOpen"
              ref="target"
              class="absolute right-0 z-[10000] w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none hover:cursor-pointer"
              role="menu"
            >
              <NuxtLink to="/" class="block px-4 py-2 text-sm text-gray-700">
                Your Profile
              </NuxtLink>
              <NuxtLink to="/" class="block px-4 py-2 text-sm text-gray-700">
                Settings
              </NuxtLink>
              <span
                class="block px-4 py-2 text-sm text-gray-700"
                @click="authStore.logout"
              >
                Sign Out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const target = ref(null);
onClickOutside(target, () => (isProfileMenuOpen.value = false));

// Profile dropdown state
const isProfileMenuOpen = ref(false);

const toggleProfileMenu = () => {
  console.log("Before toggle:", isProfileMenuOpen.value);
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
  console.log("After toggle:", isProfileMenuOpen.value);
};
</script>

<style scoped>
.size-6 {
  height: 24px;
  width: 24px;
}
.size-8 {
  height: 32px;
  width: 32px;
}
</style>
