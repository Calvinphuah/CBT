import { useAuthStore } from "~/stores/auth.store";

const PROTECTED_ROUTES = ["/", "/gratitude", "/cbt", "/breathing"];
const GUEST_ONLY_ROUTES = ["/login", "/signup"];

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  authStore.setupAuthListener();

  const redirectUser = () => {
    const { path } = router.currentRoute.value;

    if (authStore.user) {
      console.log("Redirecting to landing page");
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push("/");
      }
    }

    if (!authStore.user) {
      console.log("Redirecting to login page");
      if (PROTECTED_ROUTES.includes(path)) {
        router.push("/login");
      }
    }
  };

  watch(
    () => authStore.user,
    () => redirectUser()
  );
});
