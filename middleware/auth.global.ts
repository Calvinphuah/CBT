import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Public routes where middleware should not run
  const publicPages = ["/login", "/signup"];

  // If the route is public, skip the middleware
  if (publicPages.includes(to.path)) {
    return;
  }

  // Wait for auth state to be resolved
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

  // Redirect to login if user is not authenticated
  if (!authStore.user) {
    return navigateTo("/login");
  }
});
