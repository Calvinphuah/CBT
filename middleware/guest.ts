import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuthStore();

  if (user) {
    console.log("Middleware pushing to landing page");
    return navigateTo("/landing");
  }
});
