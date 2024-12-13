<template>
  <HideFromUser>
    <div>
      <form @submit.prevent="handleSignup">
        <input v-model="email" type="text" placeholder="Email" />
        <input v-model="password" type="text" placeholder="Password" />
        <button type="submit">Signup</button>
      </form>
      <p v-if="authStore.signupError" class="text-red-500">
        {{ authStore.signupError }}
      </p>
    </div></HideFromUser
  >
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const handleSignup = async () => {
  if (!email.value || !password.value) return;
  await authStore.signup(email.value, password.value);
};
definePageMeta({
  middleware: ["guest"],
});
</script>
