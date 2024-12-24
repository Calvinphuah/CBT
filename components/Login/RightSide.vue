<template>
  <div
    class="flex flex-col justify-center items-center w-full h-full p-4 md:p-8 bg-[#f5f4ef] min-h-screen"
  >
    <!-- Header -->
    <h3 class="mb-8 md:mb-20 text-2xl md:text-3xl font-bold">Cogni</h3>
    <h2 class="text-3xl md:text-5xl font-medium mb-4 text-center">
      Your thoughts,
      <br />
      Calmed
    </h2>
    <h3 class="text-center mb-6 md:mb-10 text-sm md:text-base">
      Cognitive Behavioural Therapy to combat negative thoughts.
    </h3>

    <!-- Login Form -->
    <div
      class="w-full max-w-[500px] p-4 md:p-8 bg-[#f5f4ef] rounded-xl shadow-sm border border-gray-300"
    >
      <!-- Google Login Button -->
      <button
        type="button"
        class="bg-white text-black font-semibold py-2 px-4 border border-gray-200 rounded-lg hover:border-gray-400 flex items-center justify-center gap-2 w-full transition-all focus:outline-none focus:ring-2"
        @click="handleGoogleLogin"
      >
        <img
          src="../../assets/svgs/google-icon.svg"
          alt="Google"
          class="w-4 h-4 mr-2"
        />
        Continue with Google
      </button>

      <!-- Divider -->
      <div class="flex items-center justify-center my-4 md:my-6">
        <div class="border-t border-gray-300 w-1/3"></div>
        <p class="px-4 text-sm text-gray-600">OR</p>
        <div class="border-t border-gray-300 w-1/3"></div>
      </div>

      <!-- Email Login Form -->
      <form class="space-y-4" @submit.prevent="handleEmailLogin">
        <div class="space-y-2">
          <InputBox
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your personal email"
          />
        </div>

        <button
          type="submit"
          class="bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
          :disabled="loading"
        >
          Continue with email
        </button>
        <p v-if="loginError" class="text-red-500 text-center">
          {{ loginError }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";

// Use the auth store
const authStore = useAuthStore();

// State for form inputs
const email = ref("");

// Computed properties for loading and error state
const loading = computed(() => authStore.initialAuthValueReady === false);
const loginError = computed(() => authStore.loginError);

// Handle Email Login
const handleEmailLogin = async () => {
  try {
    await authStore.login(email.value, ""); // Provide an appropriate password or implement passwordless login
    console.log("Logged in user:", authStore.user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Email login failed:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
};

// Handle Google Login
const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle?.();
    console.log("Google Sign-In successful:", authStore.user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Email login failed:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
};
</script>
