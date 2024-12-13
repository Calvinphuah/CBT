<template>
  <HideFromUser>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="text" placeholder="Email" />
        <input v-model="password" type="text" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p v-if="authStore.loginError" class="text-red-500">
        {{ authStore.loginError }}
      </p>
    </div></HideFromUser
  >
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");

const authStore = useAuthStore();

const handleLogin = async () => {
  if (!email.value || !password.value) return;
  await authStore.login(email.value, password.value);
};
definePageMeta({
  middleware: ["guest"],
});
</script>
