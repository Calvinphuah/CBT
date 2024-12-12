<template>
  <div>
    <h1 class="text-3xl font-bold underline">Welcome to Nuxt Firebase Auth</h1>

    <!-- Show loading state -->
    <div v-if="loading">Loading...</div>

    <!-- Show user details if logged in -->
    <div v-else-if="user">
      <p>Logged in as: {{ user.email }}</p>
      <button @click="handleLogout">Logout</button>
    </div>

    <!-- Show login/signup form if not logged in -->
    <div v-else>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="handleSignUp">Sign Up</button>
      <button @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "firebase/auth";

// Access `useAuth` directly
const { user, loading, signUp, login, logout } = useAuth();

// Reactive form data with types
const email = ref<string>("");
const password = ref<string>("");

// Sign-up handler
const handleSignUp = async (): Promise<void> => {
  try {
    const newUser: User = await signUp(email.value, password.value);
    console.log("Signed up user:", newUser);
  } catch (error: unknown) {
    console.error("Sign-up error:", (error as Error).message);
  }
};

// Login handler
const handleLogin = async (): Promise<void> => {
  try {
    const loggedInUser: User = await login(email.value, password.value);
    console.log("Logged in user:", loggedInUser);
  } catch (error: unknown) {
    console.error("Login error:", (error as Error).message);
  }
};

// Logout handler
const handleLogout = async (): Promise<void> => {
  try {
    await logout();
    console.log("User logged out");
  } catch (error: unknown) {
    console.error("Logout error:", (error as Error).message);
  }
};
</script>
