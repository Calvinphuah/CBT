import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { format } from "date-fns";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    data: [],
    error: null,
  }),
  // Functions we call on the store to update state
  actions: {
    // Fetching all data
    // Call this when the page first starts
    async fetchAllData() {
      this.error = null;

      const { $auth, $db } = useNuxtApp();
      const authStore = useAuthStore();

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

      // Check if we have a user after auth is ready
      if (!$auth.currentUser?.uid) {
        console.log("No authenticated user found");
        this.data = [];
        return;
      }

      try {
        const dataQuery = query(
          collection($db, "data"),
          where("userId", "==", $auth.currentUser?.uid)
        );
        const snapshot = await getDocs(dataQuery);
        this.data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching data:", error);
      }
    },

    // Adding new data
    async addData(data: object): Promise<void> {
      console.log("Adding New Data...");
      this.error = null;

      const { $db, $auth } = useNuxtApp();

      const compiledData = {
        ...data,
        createdDate: new Date(),
        userId: $auth.currentUser.uid,
        createdBy: $auth.currentUser.email,
      };

      try {
        const docRef = await addDoc(collection($db, "data"), compiledData);

        this.data.push({ id: docRef.id, ...compiledData });
      } catch (error) {
        this.error = error.message;
        console.error("Error adding document:", error);
      }
    },

    // Updating data
    async updateData(id, updates) {
      this.error = null;

      const { $db } = useNuxtApp();

      const docRef = doc($db, "data", id);
      try {
        await updateDoc(docRef, updates);

        const index = this.data.findIndex((data) => data.id === id);
        if (index !== -1) {
          this.data[index] = { ...this.data[index], ...updates };
        }
      } catch (error) {
        this.error = error.message;

        console.error("Error updating document:", error);
      }
    },

    // Deleting data
    async deleteData(id) {
      this.error = null;
      const { $db } = useNuxtApp();
      const docRef = doc($db, "data", id);
      try {
        await deleteDoc(docRef);
        this.data = this.data.filter((item) => item.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error("Error deleting document:", error);
      }
    },
  },
  getters: {
    onlyEmails(): Array<string> {
      return this.data.map((item) => item.createdBy);
    },
  },
});
