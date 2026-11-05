import { defineStore } from "pinia";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

interface AuthState {
  user: User | null;
  initialAuthValueReady: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    initialAuthValueReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp();

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user;
          this.initialAuthValueReady = true;
          // console.log("User state changed", this.user);
        });
      } else {
        console.error("Firebase Auth is not initialized");
      }
    },

    async logout(): Promise<void> {
      const { $auth } = useNuxtApp();

      try {
        await signOut($auth);
      } catch (err) {
        console.error(
          "Logout error:",
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        throw err;
      }
    },

    async loginWithGoogle(): Promise<void> {
      const { $auth } = useNuxtApp();

      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup($auth, provider);
        this.user = result.user;
      } catch (err) {
        console.error(
          "Google login error:",
          err instanceof Error ? err.message : err
        );
        throw err;
      }
    },
  },

  getters: {
    isAuthenticated(): boolean {
      return !!this.user;
    },

    userEmail(): string | null {
      return this.user?.email ?? null;
    },

    userId(): string | null {
      return this.user?.uid ?? null;
    },
  },
});
