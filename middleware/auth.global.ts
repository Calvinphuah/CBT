// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  // console.log("In middleware");
  const { user, loading } = useAuth();
  // console.log(user.value, loading);
  const publicPages = ["/login", "/verify"];
  const authRequired = !publicPages.includes(to.path);

  // Wait for auth state to be determined
  if (loading.value) {
    return;
  }

  // If it requires auth and user is not logged in, redirect to login
  if (authRequired && !user.value) {
    return navigateTo("/login");
  }

  // If user is already logged in and tries to access auth pages, redirect to home
  if (user.value && publicPages.includes(to.path)) {
    return navigateTo("/");
  }
});
