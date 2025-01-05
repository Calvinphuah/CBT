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
  Timestamp,
} from "firebase/firestore";
import type { CBTEntry, CBTState } from "@/types/cbt";

export const useCBTStore = defineStore("cbtStore", {
  state: (): CBTState => ({
    cbtEntries: [],
    formData: {
      activating: "",
      beliefs: "",
      consequentFeelings: "",
      dispute: "",
    },
    isEditing: false,
    isNewEntry: false,
    selectedEntry: null,
    loading: false,
    error: null,
  }),

  actions: {
    resetForm() {
      this.formData = {
        activating: "",
        beliefs: "",
        consequentFeelings: "",
        dispute: "",
      };
    },

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

    populateForm(entry: CBTEntry) {
      this.formData = {
        activating: entry.activatingEvent,
        beliefs: entry.beliefs,
        consequentFeelings: entry.consequentFeelings,
        dispute: entry.disputes,
      };
      this.isEditing = true;
      this.isNewEntry = false;
      this.selectedEntry = entry;
    },

    async fetchEntries() {
      this.loading = true;
      this.error = null;

      const { $auth, $db } = useNuxtApp();

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
          orderBy("createdAt", "desc")
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

    // Adds to firestore and resets form
    async submitCurrentEntry() {
      if (!this.isFormValid) {
        alert("Form is invalid, please fill out all fields.");
        return;
      }

      const entry = {
        activatingEvent: this.formData.activating,
        beliefs: this.formData.beliefs,
        consequentFeelings: this.formData.consequentFeelings,
        disputes: this.formData.dispute,
      };

      try {
        if (this.isEditing && this.selectedEntry) {
          await this.updateEntry(this.selectedEntry.id, entry);
        } else {
          await this.addEntry(entry);
        }
        this.handleBackToList();
        console.log("Entry submitted successfully");
      } catch (error) {
        console.error("Error submitting entry:", error);
        throw error;
      }
    },

    async addEntry(entry: Omit<CBTEntry, "id" | "createdAt" | "userId">) {
      this.loading = true;
      this.error = null;

      const { $db, $auth } = useNuxtApp();

      if (!$auth.currentUser?.uid) {
        throw new Error("User not authenticated");
      }

      const newEntry: Omit<CBTEntry, "id"> = {
        ...entry,
        createdAt: Timestamp.now(),
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
      const docRef = doc($db, "cbtEntries", id);

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

    handleNewEntry() {
      try {
        this.isEditing = false;
        this.isNewEntry = true;
        this.resetForm();
      } catch (error) {
        console.error("Error handling new entry:", error);
      }
    },

    handleUpdateEntry(entry: CBTEntry) {
      try {
        this.isEditing = true;
        this.isNewEntry = false;
        this.populateForm(entry);
      } catch (error) {
        console.error("Error handling update entry:", error);
      }
    },

    handleCancelEntry() {
      if (this.isEditing) {
        // For editing, simply reset the state and form without a prompt
        this.isEditing = false;
        this.isNewEntry = false;
        this.resetForm();
      } else if (this.isNewEntry) {
        // For new entries, check for unsaved changes
        const hasUnsavedChanges = Object.values(this.formData).some(
          (value) => value.trim().length > 0
        );

        if (hasUnsavedChanges) {
          // Ask for confirmation before discarding changes
          const confirmDiscard = confirm(
            "You have unsaved changes. Are you sure you want to cancel?"
          );
          if (!confirmDiscard) {
            return; // Do nothing if the user cancels the prompt
          }
        }

        // Reset states and form if confirmed or no changes
        this.isNewEntry = false;
        this.resetForm();
      }
    },

    handleBackToList() {
      this.isEditing = false;
      this.isNewEntry = false;
      this.resetForm();
    },
  },

  getters: {
    remainingChars(): number {
      const maxChars = 400;
      return maxChars - 100;
    },

    isFormValid(): boolean {
      return (
        this.formData.activating.trim().length > 0 &&
        this.formData.beliefs.trim().length > 0 &&
        this.formData.consequentFeelings.trim().length > 0 &&
        this.formData.dispute.trim().length > 0
      );
    },
  },
});
