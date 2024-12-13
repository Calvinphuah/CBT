/* eslint-disable no-useless-catch */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const user = ref<User | null>(null);
  const loading = ref(true);

  // Router instance
  const router = useRouter();

  onMounted(() => {
    const unsubscribe = onAuthStateChanged($auth, (newUser) => {
      user.value = newUser;
      loading.value = false;

      // Redirect to landing only if on login/auth pages
      const publicPages = ["/login", "/verify"];
      if (newUser && publicPages.includes(router.currentRoute.value.path)) {
        router.push("/landing");
      }
    });

    onUnmounted(() => unsubscribe());
  });

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $auth,
        email,
        password
      );
      router.push("/landing"); // Redirect after successful sign-up
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $auth,
        email,
        password
      );
      router.push("/landing"); // Redirect after successful login
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async (): Promise<User | null> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup($auth, provider);
      router.push("/landing"); // Redirect after successful Google login
      return result.user;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut($auth);
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    signUp,
    login,
    loginWithGoogle,
    logout,
  };
};
