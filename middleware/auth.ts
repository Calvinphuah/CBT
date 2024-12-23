import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuthStore();

  if (!user) {
    console.log("Middleware pushing to login");
    return navigateTo("/loginTest");
  }
});
