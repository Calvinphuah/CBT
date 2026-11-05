import { useAuthStore } from "~/stores/auth.store";

const PROTECTED_ROUTES = ["/", "/gratitude", "/cbt", "/meditation"];
const GUEST_ONLY_ROUTES = ["/login"];

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  authStore.setupAuthListener();

  const redirectUser = () => {
    const { path } = router.currentRoute.value;

    if (authStore.user) {
      if (GUEST_ONLY_ROUTES.includes(path)) {
        router.push("/");
      }
    }

    if (!authStore.user) {
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
