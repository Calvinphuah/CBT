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
    isViewing: false,
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
      // this.isEditing = true;
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
        const rawEntries = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as CBTEntry[];

        // 🔓 Decrypt sensitive fields before storing in Pinia state
        const decryptedEntries = await Promise.all(
          rawEntries.map((entry) =>
            serverDecrypt(entry, [
              "activatingEvent",
              "beliefs",
              "consequentFeelings",
              "disputes",
            ])
          )
        );

        this.cbtEntries = decryptedEntries;
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
        // 🔐 Encrypt sensitive fields before storing
        const encryptedEntry = (await secureEncrypt(entry, [
          "activatingEvent",
          "beliefs",
          "consequentFeelings",
          "disputes",
        ])) as Omit<CBTEntry, "id" | "createdAt" | "userId">;

        if (this.isEditing && this.selectedEntry) {
          await this.updateEntry(this.selectedEntry.id, encryptedEntry, entry);
          this.isEditing = false;
          this.isViewing = true;
        } else {
          console.log("Adding new entry:", entry);
          await this.addEntry(encryptedEntry);
          this.handleBackToList();
        }
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

        // 🔓 Immediately decrypt the entry for UI display
        const decryptedEntry = await serverDecrypt(
          { ...newEntry, id: docRef.id },
          ["activatingEvent", "beliefs", "consequentFeelings", "disputes"]
        );

        this.cbtEntries.unshift(decryptedEntry); // ✅ Store the decrypted version
        return docRef.id;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to add entry";
        console.error("❌ Error adding CBT entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateEntry(
      id: string,
      updates: Partial<CBTEntry>,
      entry: Partial<CBTEntry>
    ) {
      this.loading = true;
      this.error = null;

      const { $db } = useNuxtApp();
      const docRef = doc($db, "cbtEntries", id);

      try {
        await updateDoc(docRef, updates);
        const index = this.cbtEntries.findIndex((entry) => entry.id === id);
        if (index !== -1) {
          this.cbtEntries[index] = { ...this.cbtEntries[index], ...entry };
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

    async deleteEntry() {
      if (!this.selectedEntry?.id) {
        throw new Error("No entry selected for deletion");
      }
      const id = this.selectedEntry.id;
      console.log("Deleting entry with ID:", id);

      this.loading = true;
      this.error = null;

      const { $db } = useNuxtApp();
      const docRef = doc($db, "cbtEntries", id);

      try {
        // Remove the document from Firestore
        await deleteDoc(docRef);

        // Remove the entry from the Pinia store
        this.cbtEntries = this.cbtEntries.filter((entry) => entry.id !== id);

        // Reset form and state
        this.handleBackToList();
        console.log("Entry successfully deleted!");
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Failed to delete the entry from Firestore.";
        console.error("Error deleting CBT entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    handleBackToList() {
      this.isEditing = false;
      this.isNewEntry = false;
      this.isViewing = false;
      this.resetForm();
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

    handleUpdateEntry() {
      try {
        this.isEditing = true;
        this.isNewEntry = false;
        this.isViewing = false;
      } catch (error) {
        console.error("Error handling update entry:", error);
      }
    },

    cancelUpdateEntry() {
      try {
        this.isEditing = false;
        this.isNewEntry = false;
        this.isViewing = true;
      } catch (error) {
        console.error("Error handling update entry:", error);
      }
    },

    handleViewEntry(entry: CBTEntry) {
      try {
        this.isEditing = false;
        this.isNewEntry = false;
        this.isViewing = true;
        this.populateForm(entry);
      } catch (error) {
        console.error("Error handling update entry:", error);
      }
    },

    handleCancelEntry() {
      if (this.isViewing) {
        // For editing, simply reset the state and form without a prompt
        this.handleBackToList();
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
