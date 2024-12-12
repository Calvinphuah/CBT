<template>
  <div>
    <h1>Login</h1>
    <button @click="handleGoogleSignIn">Sign in with Google</button>
    <p v-if="user">Logged in as: {{ user.email }}</p>
    {{ user?.displayName }}
  </div>
</template>

<script setup lang="ts">
const { user, loginWithGoogle } = useAuth();

const handleGoogleSignIn = async () => {
  try {
    const loggedInUser = await loginWithGoogle();
    console.log("Google Sign-In successful:", loggedInUser);
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};
</script>
