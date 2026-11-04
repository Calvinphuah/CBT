<template>
  <div
    class="flex flex-1 flex-col gap-3.5 px-5 pt-7 md:mx-auto md:w-full md:max-w-[440px] md:justify-center md:px-0"
    :style="{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }"
  >
    <CommonLogo size="lg" />
    <h1 class="text-display md:text-[40px] md:leading-[44px]">
      {{ copy.loginTitle }}
    </h1>
    <p class="text-[15px] leading-[21px] text-ink-2">
      Work through anxious thoughts with CBT, gratitude and guided meditation.
      Your entries are encrypted, and only you can read them.
    </p>

    <div class="flex-1 md:hidden" />

    <button
      type="button"
      class="btn mt-2 w-full bg-surface text-ink ring-[1.5px] ring-inset ring-rule hover:bg-sunken"
      :disabled="isSigningIn"
      @click="handleGoogleLogin"
    >
      <img src="../../assets/svgs/google-icon.svg" alt="" class="size-[18px]" />
      {{ isSigningIn ? "Signing in…" : "Continue with Google" }}
    </button>
    <p v-if="loginError" class="text-[15px] text-danger" role="alert">{{ loginError }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();
const { copy } = useAppStyle();

const isSigningIn = ref(false);
const loginError = ref("");

// Handle Google Login
const handleGoogleLogin = async () => {
  isSigningIn.value = true;
  loginError.value = "";
  try {
    await authStore.loginWithGoogle?.();
  } catch (error) {
    // Closing the Google popup on purpose is not an error worth showing.
    const code = (error as { code?: string }).code;
    if (code !== "auth/popup-closed-by-user" && code !== "auth/cancelled-popup-request") {
      loginError.value = "Couldn’t sign in with Google. Check your connection and try again.";
    }
    if (error instanceof Error) {
      console.error("Google login failed:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  } finally {
    isSigningIn.value = false;
  }
};
</script>
