import { where } from "firebase/firestore";

export const useTestStore = defineStore("testStore", {
  state: () => ({
    data: [],
    loading: false,
    error: null,
  }),

  actions: {
    async getAllData() {
      const firestore = useFirestore();
      this.loading = true;
      const { $auth } = useNuxtApp();
      const authStore = useAuthStore();

      try {
        // Wait for auth to be ready
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

        // Use the subscribeToCollection function from our composable
        return firestore.subscribeToCollection(
          "data",
          (items) => {
            this.data = items;
            this.loading = false;
          },
          [where("userId", "==", $auth.currentUser.uid)]
        );
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
  },
});
