/* eslint-disable no-useless-catch */
// composables/useAuth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  type User,
} from "firebase/auth";

export const useAuth = () => {
  const { $firebase } = useNuxtApp();
  const user = ref<User | null>(null);
  const loading = ref(true);

  onMounted(() => {
    const unsubscribe = onAuthStateChanged($firebase.auth, (newUser) => {
      user.value = newUser;
      loading.value = false;
    });

    onUnmounted(() => unsubscribe());
  });

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        $firebase.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async (): Promise<User | null> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup($firebase.auth, provider);
      return result.user;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut($firebase.auth);
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
