import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

interface AuthState {
  user: User | null;
  loginError: string | null;
  signupError: string | null;
  initialAuthValueReady: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    loginError: null,
    signupError: null,
    initialAuthValueReady: false,
  }),

  actions: {
    setupAuthListener() {
      const { $auth } = useNuxtApp();

      if ($auth) {
        onAuthStateChanged($auth, (user) => {
          this.user = user;
          this.initialAuthValueReady = true;
          console.log("User state changed", this.user);
        });
      } else {
        console.error("Firebase Auth is not initialized");
      }
    },

    async signup(email: string, password: string): Promise<void> {
      const { $auth } = useNuxtApp();

      this.signupError = null;

      try {
        await createUserWithEmailAndPassword($auth, email, password);
      } catch (err) {
        this.signupError =
          err instanceof Error ? err.message : "An unknown error occurred";
        throw err;
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

    async login(email: string, password: string): Promise<void> {
      const { $auth } = useNuxtApp();

      this.loginError = null;
      try {
        await signInWithEmailAndPassword($auth, email, password);
      } catch (err) {
        this.loginError =
          err instanceof Error ? err.message : "An unknown error occurred";
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
