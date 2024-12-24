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
  orderBy,
} from "firebase/firestore";
import type { CBTEntry, CBTState } from "@/types/cbt";

export const useCBTStore = defineStore("cbtStore", {
  state: (): CBTState => ({
    cbtEntries: [], // renamed from data/entries to cbtEntries
    loading: false,
    error: null,
  }),

  actions: {
    async waitForAuth() {
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
    },

    async fetchEntries() {
      this.loading = true;
      this.error = null;

      const { $auth, $db } = useNuxtApp();

      // Wait for auth to be ready
      await this.waitForAuth();

      if (!$auth.currentUser?.uid) {
        console.log("No authenticated user found");
        this.cbtEntries = [];
        this.loading = false;
        return;
      }

      try {
        const entriesQuery = query(
          collection($db, "cbtEntries"),
          where("userId", "==", $auth.currentUser.uid),
          orderBy("createdAt", "desc") // Newest first
        );

        const snapshot = await getDocs(entriesQuery);
        this.cbtEntries = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as CBTEntry[];
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch entries";
        console.error("Error fetching CBT entries:", error);
      } finally {
        this.loading = false;
      }
    },

    async addEntry(entry: Omit<CBTEntry, "id" | "createdAt" | "userId">) {
      // Omit types id, creataedAt and userId because they are auto-generated
      this.loading = true;
      this.error = null;

      const { $db, $auth } = useNuxtApp();

      if (!$auth.currentUser?.uid) {
        throw new Error("User not authenticated");
      }

      const newEntry: Omit<CBTEntry, "id"> = {
        ...entry,
        createdAt: new Date(),
        userId: $auth.currentUser.uid,
      };

      try {
        const docRef = await addDoc(collection($db, "cbtEntries"), newEntry);
        this.cbtEntries.unshift({ ...newEntry, id: docRef.id });
        return docRef.id;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to add entry";
        console.error("Error adding CBT entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateEntry(id: string, updates: Partial<CBTEntry>) {
      this.loading = true;
      this.error = null;

      const { $db } = useNuxtApp();

      const docRef = doc($db, "cbt_entries", id);

      try {
        await updateDoc(docRef, updates);
        const index = this.cbtEntries.findIndex((entry) => entry.id === id);
        if (index !== -1) {
          this.cbtEntries[index] = { ...this.cbtEntries[index], ...updates };
        }
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to update entry";
        console.error("Error updating CBT entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteEntry(id: string) {
      this.loading = true;
      this.error = null;

      const { $db } = useNuxtApp();

      const docRef = doc($db, "cbtEntries", id);

      try {
        await deleteDoc(docRef);
        this.cbtEntries = this.cbtEntries.filter((entry) => entry.id !== id);
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to delete entry";
        console.error("Error deleting CBT entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getEntryById: (state) => (id: string) => {
      return state.cbtEntries.find((entry) => entry.id === id);
    },
  },
});
