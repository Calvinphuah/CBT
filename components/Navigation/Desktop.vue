<template>
  <nav class="bg-white">
    <div class="px-4 mx-auto sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <!-- Logo, Title, and Navigation -->
        <div class="flex items-center flex-1 sm:justify-start">
          <!-- Logo and Title -->
          <NuxtLink to="/" class="flex items-center">
            <img
              class="w-auto h-8"
              src="@/public/img/wavy-leaf.png"
              alt="Cogni Logo"
            />
            <!-- <Icon
              name="fluent:brain-sparkle-20-filled"
              size="32"
              class="text-indigo-500"
            /> -->

            <span class="ml-2 text-lg font-semibold sm:text-xl">
              Hi{{ authStore.user ? "," : "" }}
              {{ authStore.user?.displayName }}
            </span>
          </NuxtLink>

          <!-- Navigation Links -->
          <div class="hidden ml-6 space-x-4 md:block">
            <NuxtLink
              to="/"
              class="px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/cbt"
              class="px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              CBT
            </NuxtLink>
            <NuxtLink
              to="/gratitude"
              class="px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              Gratitude
            </NuxtLink>
            <NuxtLink
              to="/meditation"
              class="px-3 py-2 text-sm font-medium text-black rounded-md hover:bg-gray-700 hover:text-white"
              active-class="text-white bg-gray-900"
            >
              Meditation
            </NuxtLink>
          </div>
        </div>

        <!-- User Icon and Profile Menu (wrapped in the same container) -->
        <div ref="menuContainer" class="relative">
          <button
            type="button"
            class="flex items-center focus:outline-none"
            @click="toggleProfileMenu"
          >
            <Icon
              name="heroicons:user-16-solid"
              style="color: black"
              size="24"
            />
          </button>

          <!-- Profile Dropdown -->
          <div
            v-show="isProfileMenuOpen"
            class="absolute right-0 z-[10000] w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none"
            role="menu"
          >
            <!-- <NuxtLink
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </NuxtLink>
            <NuxtLink
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </NuxtLink> -->
            <span
              role="menuitem"
              class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              @click="authStore.logout"
            >
              Sign Out
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

// Access auth store
const authStore = useAuthStore();

// State for the profile dropdown
const isProfileMenuOpen = ref(false);

// Reference to the icon and dropdown container
const menuContainer = ref(null);

// Toggle the profile menu
const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

// Close the dropdown when clicking outside
onClickOutside(menuContainer, () => {
  if (isProfileMenuOpen.value) {
    isProfileMenuOpen.value = false;
  }
});
</script>
