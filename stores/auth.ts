import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    loginError: null,
    signupError: null,
    initialAuthValueReady: false,
  }),
  actions: {
    // realtime
    setupAuthListener() {
      const { $auth } = useNuxtApp();

      // Before we set listener up, auth service is initialised
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

    // signup
    async signup(email: string, password: string) {
      const { $auth } = useNuxtApp();

      this.signupError = null;

      try {
        // Returs the user credential
        const cred = await createUserWithEmailAndPassword(
          $auth,
          email,
          password
        );
      } catch (error) {
        this.signupError = error.message;
      }
    },
    // logout
    async logout() {
      const { $auth } = useNuxtApp();

      await signOut($auth);
    },

    // login
    async login(email: string, password: string) {
      const { $auth } = useNuxtApp();

      this.loginError = null;
      try {
        const cred = await signInWithEmailAndPassword($auth, email, password);
      } catch (error) {
        this.loginError = error.message;
      }
    },
  },
});
