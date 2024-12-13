import { useAuthStore } from "@/stores/auth";

const PROTECTED_ROUTES = ["/landing"];
const GUEST_ONLY_ROUTES = ["/loginTest", "/signup"];

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  authStore.setupAuthListener();

  const redirectUser = () => {
    const { path } = router.currentRoute.value;

    if (authStore.user) {
      console.log("Redirecting to landing page");
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push("/landing");
      }
    }

    if (!authStore.user) {
      console.log("Redirecting to login page");
      if (PROTECTED_ROUTES.includes(path)) {
        router.push("/loginTest");
      }
    }
  };

  watch(
    () => authStore.user,
    () => redirectUser()
  );
});
