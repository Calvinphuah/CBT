import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  // Wait for authentication state to be resolved
  if (!authStore.initialAuthValueReady) {
    await new Promise<void>((resolve) => {
      const unwatch = authStore.$subscribe((mutation, state) => {
        if (state.initialAuthValueReady) {
          unwatch();
          resolve();
        }
      });
    });
  }

  // Redirect if the user is not authenticated
  if (authStore.user) {
    console.log("Middleware pushing to landing");
    return navigateTo("/");
  }
});
