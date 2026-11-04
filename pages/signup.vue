<template>
  <HideFromUser>
    <div
      class="mx-auto flex min-h-[100dvh] max-w-[440px] flex-col justify-center gap-5 bg-page px-5 text-ink"
      :style="{
        paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }"
    >
      <CommonLogo size="lg" />
      <h1 class="text-display">Create your account</h1>
      <form class="flex flex-col gap-4" @submit.prevent="handleSignup">
        <InputBox
          id="signup-email"
          v-model="email"
          type="email"
          label="Email"
          autocomplete="email"
          placeholder="you@example.com"
        />
        <InputBox
          id="signup-password"
          v-model="password"
          type="password"
          label="Password"
          autocomplete="new-password"
          placeholder="At least 6 characters"
        />
        <button type="submit" class="btn-primary mt-1 w-full">Create account</button>
      </form>
      <p v-if="authStore.signupError" class="text-[15px] text-danger" role="alert">
        {{ authStore.signupError }}
      </p>
      <p class="text-center text-[15px] text-ink-2">
        Already have an account?
        <NuxtLink to="/login" class="font-bold text-ink">Sign in</NuxtLink>
      </p>
    </div>
  </HideFromUser>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({ title: "Create account" });

const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const handleSignup = async () => {
  if (!email.value || !password.value) return;
  await authStore.signup(email.value, password.value);
};
</script>
