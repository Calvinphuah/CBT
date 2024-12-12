/* eslint-disable no-useless-catch */
// composables/useAuth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
    // eslint-disable-next-line no-useless-catch
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
    logout,
  };
};
