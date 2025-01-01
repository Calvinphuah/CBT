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
    currentStep: 0,
    steps: [
      { title: "Activating Event", completed: false },
      { title: "Beliefs", completed: false },
      { title: "Consequent Feelings", completed: false },
      { title: "Dispute Negative Thoughts", completed: false },
    ],
    formData: {
      activating: "",
      beliefs: "",
      consequentFeelings: "",
      dispute: "",
    },
    loading: false,
    error: null,
  }),

  actions: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.steps[this.currentStep].completed = true;
        this.currentStep++;
      }
    },

    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },

    updateStepData(value: string) {
      switch (this.currentStep) {
        case 0:
          this.formData.activating = value;
          break;
        case 1:
          this.formData.beliefs = value;
          break;
        case 2:
          this.formData.consequentFeelings = value;
          break;
        case 3:
          this.formData.dispute = value;
          break;
      }
    },

    resetForm() {
      this.currentStep = 0;
      this.formData = {
        activating: "",
        beliefs: "",
        consequentFeelings: "",
        dispute: "",
      };
      this.steps.forEach((step) => (step.completed = false));
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
      if (!this.isCurrentStepValid) return;

      const entry = {
        activatingEvent: this.formData.activating,
        beliefs: this.formData.beliefs,
        consequentFeelings: this.formData.consequentFeelings,
        disputes: this.formData.dispute,
      };

      try {
        await this.addEntry(entry);
        this.resetForm();
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
  },

  getters: {
    remainingChars(): number {
      const maxChars = 400;
      const currentText = (() => {
        switch (this.currentStep) {
          case 0:
            return this.formData.activating;
          case 1:
            return this.formData.beliefs;
          case 2:
            return this.formData.consequentFeelings;
          case 3:
            return this.formData.dispute;
          default:
            return "";
        }
      })();
      return maxChars - currentText.length;
    },

    currentStepData(): string {
      switch (this.currentStep) {
        case 0:
          return this.formData.activating;
        case 1:
          return this.formData.beliefs;
        case 2:
          return this.formData.consequentFeelings;
        case 3:
          return this.formData.dispute;
        default:
          return "";
      }
    },

    isCurrentStepValid(): boolean {
      return this.currentStepData !== "";
    },

    // getEntryById: () => (id: string) => {
    //   return this.cbtEntries.find((entry) => entry.id === id);
    // },
  },
});
