import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { format } from "date-fns";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    data: [],
  }),
  // Functions we call on the store to update state
  actions: {
    // Fetching all data
    // Call this when the page first starts
    async fetchAllData() {
      const { $auth } = useNuxtApp();
      const { $db } = useNuxtApp();

      if (!$auth) {
        console.error("Firebase Auth is not initialized");
        return;
      }

      if (!$db) {
        console.error("Firebase DB is not initialized");
        return;
      }

      const snapshot = await getDocs(collection($db, "data"));
      this.data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    },

    // Adding new data
    async addData(data: object): Promise<void> {
      console.log("Adding New Data...");
      const { $auth } = useNuxtApp();
      const { $db } = useNuxtApp();

      if (!$auth) {
        console.error("Firebase Auth is not initialized");
        return;
      }

      if (!$db) {
        console.error("Firebase DB is not initialized");
        return;
      }

      if (!$auth.currentUser) {
        console.error("User is not authenticated");
        throw new Error("You need to be authenticated to add data");
      }

      const compiledData = {
        ...data,
        createdData: new Date(),
        createdByUid: $auth.currentUser.uid,
        createdByEmail: $auth.currentUser.email,
      };

      try {
        const docRef = await addDoc(collection($db, "data"), compiledData);

        this.data.push({ id: docRef.id, ...compiledData });
      } catch (error) {
        console.error("Error adding document:", error);
      }
    },

    // Updating data
    async updateData(id, updates) {
      const { $db } = useNuxtApp();

      const docRef = doc($db, "data", id);
      try {
        await updateDoc(docRef, updates);

        const index = this.data.findIndex((data) => data.id === id);
        if (index !== -1) {
          this.data[index] = { ...this.data[index], ...updates };
        }
      } catch (error) {
        console.error("Error updating document:", error);
      }
    },

    // Deleting data
    async deleteData(id) {
      const { $db } = useNuxtApp();

      const docRef = doc($db, "data", id);
      try {
        await deleteDoc(docRef);
        this.data = this.data.filter((item) => item.id !== id);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    },
  },
  getters: {
    onlyEmails(): Array<string> {
      return this.data.map((item) => item.createdByEmail);
    },
  },
});
