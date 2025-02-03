<template>
  <div
    class="flex flex-col justify-center items-center w-full h-full p-4 md:p-8 bg-[#f5f4ef] min-h-screen"
  >
    <!-- Header -->
    <div class="flex gap-2">
      <img
        class="w-auto h-8"
        src="@/public/img/wavy-leaf.png"
        alt="Cogni Logo"
      />
      <h3 class="mb-8 text-2xl font-bold md:mb-20 md:text-3xl">Cogni</h3>
    </div>
    <h2 class="mb-4 text-3xl font-medium text-center md:text-5xl">
      Your thoughts,
      <br />
      Calmed
    </h2>
    <h3 class="mb-6 text-sm text-center md:mb-10 md:text-base">
      Cognitive Behavioural Therapy to combat negative thoughts.
    </h3>

    <!-- Login Form -->
    <div
      class="w-full max-w-[500px] p-4 md:p-8 bg-[#f5f4ef] rounded-xl shadow-sm border border-gray-300"
    >
      <!-- Google Login Button -->
      <button
        type="button"
        class="flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-black transition-all bg-white border border-gray-200 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2"
        @click="handleGoogleLogin"
      >
        <img
          src="../../assets/svgs/google-icon.svg"
          alt="Google"
          class="w-4 h-4 mr-2"
        />
        Sign In with Google
      </button>

      <!-- Divider -->
      <!-- <div class="flex items-center justify-center my-4 md:my-6">
        <div class="w-1/3 border-t border-gray-300"></div>
        <p class="px-4 text-sm text-gray-600">OR</p>
        <div class="w-1/3 border-t border-gray-300"></div>
      </div> -->

      <!-- Email Login Form (Disabled) -->
      <!-- <form class="space-y-4">
        <div class="space-y-2">
          <InputBox
            id="email"
            v-model="email"
            type="email"
            placeholder="Email login currently unavailable"
            disabled
          />
        </div>

        <button
          type="button"
          class="w-full px-4 py-2 font-semibold text-white bg-gray-400 rounded-lg cursor-not-allowed"
          disabled
        >
          Continue with Email (Unavailable)
        </button>
      </form> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";

// Use the auth store
const authStore = useAuthStore();

// State for form inputs
// const email = ref("");

// // Computed properties for loading and error state
// const loading = computed(() => authStore.initialAuthValueReady === false);
// const loginError = computed(() => authStore.loginError);

// // Handle Email Login
// const handleEmailLogin = async () => {
//   try {
//     await authStore.login(email.value, ""); // Provide an appropriate password or implement passwordless login
//     console.log("Logged in user:", authStore.user);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Email login failed:", error.message);
//     } else {
//       console.error("Unknown error occurred:", error);
//     }
//   }
// };

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
