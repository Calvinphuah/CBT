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
import type { HasId } from "~/types/store";

// Define interfaces
interface DataItem extends HasId {
  createdDate: Date;
  userId: string;
  createdBy: string;
  [key: string]: any; // For any additional fields
}

interface DataState {
  data: DataItem[];
  error: string | null;
}

// Define type for new data input
interface NewDataInput {
  [key: string]: any;
}

export const useDataStore = defineStore("dataStore", {
  state: (): DataState => ({
    data: [],
    error: null,
  }),

  actions: {
    async fetchAllData() {
      this.error = null;

      const { $auth, $db } = useNuxtApp();
      const authStore = useAuthStore();

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
        this.data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as DataItem[];
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error fetching data:", error);
      }
    },

    async addData(data: NewDataInput): Promise<void> {
      console.log("Adding New Data...");
      this.error = null;

      const { $db, $auth } = useNuxtApp();

      if (!$auth.currentUser?.uid || !$auth.currentUser?.email) {
        throw new Error("User not authenticated");
      }

      const compiledData: DataItem = {
        ...data,
        createdDate: new Date(),
        userId: $auth.currentUser.uid,
        createdBy: $auth.currentUser.email,
        id: "", // Will be updated after adding to Firestore
      };

      try {
        const docRef = await addDoc(collection($db, "data"), compiledData);
        const newData = { ...compiledData, id: docRef.id };
        this.data.push(newData);
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error adding document:", error);
      }
    },

    async updateData(id: string, updates: Partial<DataItem>) {
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
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error updating document:", error);
      }
    },

    async deleteData(id: string) {
      this.error = null;
      const { $db } = useNuxtApp();
      const docRef = doc($db, "data", id);
      try {
        await deleteDoc(docRef);
        this.data = this.data.filter((item) => item.id !== id);
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error deleting document:", error);
      }
    },
  },

  getters: {
    onlyEmails(): string[] {
      return this.data.map((item) => item.createdBy);
    },
  },
});
