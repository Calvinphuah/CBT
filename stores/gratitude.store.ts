import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
  Timestamp,
  updateDoc,
  doc,
  deleteDoc,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { GratitudeEntry, GratitudeState } from "@/types/gratitude";
import { secureEncrypt, serverDecrypt } from "@/utils/encryption";

const images = [
  "img/cat.png",
  "img/dog.png",
  "img/leaf.png",
  "img/popcorn.png",
  "img/wavy-leaf.png",
] as const;

const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

export const useGratitudeStore = defineStore("gratitudeStore", {
  state: (): GratitudeState => ({
    newEntry: "",
    gratitudeEntries: [],
    currentEntry: null,
    isEditing: false,
    isNewEntry: false,
    selectedEntry: null,
    loading: false,
    error: null,
    lastVisible: null,
    allLoaded: false,
  }),

  actions: {
    resetForm() {
      this.newEntry = "";
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

    async fetchEntries(loadMore = false) {
      if (this.loading || (this.allLoaded && loadMore)) return;

      this.loading = true;
      this.error = null;

      const { $auth, $db } = useNuxtApp();

      await this.waitForAuth();

      if (!$auth.currentUser?.uid) {
        console.log("No authenticated user found");
        this.gratitudeEntries = [];
        this.loading = false;
        return;
      }

      try {
        const entriesQuery = query(
          collection($db, "gratitudeEntries"),
          where("userId", "==", $auth.currentUser.uid),
          orderBy("createdAt", "desc"),
          ...(loadMore && this.lastVisible
            ? [startAfter(this.lastVisible)]
            : []),
          limit(10)
        );

        const snapshot = await getDocs(entriesQuery);

        if (snapshot.empty) {
          this.allLoaded = true;
          return;
        }

        const rawEntries = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            ...doc.data(),
            id: doc.id,
          })
        ) as GratitudeEntry[];

        console.log("📥 Firestore Entries (Encrypted):", rawEntries);

        // 🔓 Decrypt `entry` field before displaying in UI
        const decryptedEntries = await Promise.all(
          rawEntries.map(async (entry) => {
            try {
              const decryptedEntry = await serverDecrypt(entry, ["entry"]);
              return {
                ...entry,
                ...decryptedEntry,
              };
            } catch (error) {
              console.error(`❌ Error decrypting entry ID: ${entry.id}`, error);
              return entry; // Use encrypted version as fallback
            }
          })
        );

        console.log("📤 Decrypted Entries (For UI):", decryptedEntries);

        this.gratitudeEntries = loadMore
          ? [...this.gratitudeEntries, ...decryptedEntries]
          : decryptedEntries;

        this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch entries";
        console.error("❌ Error fetching Gratitude entries:", error);
      } finally {
        this.loading = false;
      }
    },

    async addEntry(entry: string) {
      this.loading = true;
      this.error = null;

      if (this.newEntry.trim() === "") {
        alert("Entry cannot be empty");
        return;
      }

      const { $db, $auth } = useNuxtApp();

      if (!$auth.currentUser?.uid) {
        throw new Error("User not authenticated");
      }

      const newEntry: Omit<GratitudeEntry, "id"> = {
        entry,
        createdAt: Timestamp.now(),
        userId: $auth.currentUser.uid,
        image: getRandomImage(),
      };

      try {
        // 🔐 Encrypt the `entry` field before storing in Firestore
        const encryptedEntry = await secureEncrypt(newEntry, ["entry"]);

        const docRef = await addDoc(
          collection($db, "gratitudeEntries"),
          encryptedEntry
        );

        // 🔓 Store the decrypted version in UI immediately
        this.gratitudeEntries.unshift({
          ...newEntry, // Store the original decrypted version
          id: docRef.id,
        });

        this.handleResetEntry();
        return docRef.id;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to add entry";
        console.error("❌ Error adding Gratitude entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    handleResetEntry() {
      this.isEditing = false;
      this.isNewEntry = false;
      this.resetForm();
    },

    handleNewEntry() {
      this.resetForm();
      this.isNewEntry = true;
    },

    handleCancelEntry() {
      this.isEditing = false;
      this.isNewEntry = false;
      this.resetForm();
    },

    handleEditEntry(entry: GratitudeEntry) {
      this.isEditing = true;
      this.isNewEntry = false;
      this.currentEntry = entry;
      this.newEntry = entry.entry;
      console.log("Editing entry:", entry);
    },

    async submitEditedEntry() {
      if (!this.currentEntry || !this.currentEntry.id) {
        throw new Error("No entry to update");
      }

      if (!this.newEntry) {
        alert("Entry cannot be empty");
        return;
      }
      this.loading = true;
      this.error = null;

      const { $db } = useNuxtApp();

      try {
        // 🔐 Encrypt `entry` before updating Firestore
        const encryptedUpdate = await secureEncrypt({ entry: this.newEntry }, [
          "entry",
        ]);

        const docRef = collection($db, "gratitudeEntries");
        await updateDoc(doc(docRef, this.currentEntry.id), encryptedUpdate);

        // Update UI with decrypted version
        const index = this.gratitudeEntries.findIndex(
          (entry) => entry.id === this.currentEntry?.id
        );
        if (index !== -1) {
          this.gratitudeEntries[index].entry = this.newEntry;
        }

        this.handleResetEntry();
        console.log("✅ Entry successfully updated!");
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Failed to update the entry in Firestore.";
        console.error("❌ Error updating Gratitude entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async generateGratitudeEntry() {
      // List of gratitude ideas
      const gratitudeIdeas = [
        "I'm grateful for the warm sunshine today.",
        "I appreciate the kindness of my friends and family.",
        "I’m thankful for the delicious meal I had.",
        "I’m grateful for my health and well-being.",
        "I appreciate the little moments of joy in my day.",
        "I’m thankful for the opportunity to learn and grow.",
        "I’m grateful for the beauty of nature around me.",
        "I appreciate the support and encouragement I receive.",
        "I’m thankful for the roof over my head and a place to call home.",
        "I’m grateful for the laughter that brightened my day.",
        "I appreciate the sound of birds chirping in the morning.",
        "I’m thankful for the love and care I receive from those around me.",
        "I’m grateful for access to clean water and nourishing food.",
        "I appreciate the time spent with loved ones, even virtually.",
        "I’m thankful for a cozy bed to rest in after a long day.",
        "I’m grateful for the ability to read and learn new things.",
        "I appreciate the beauty of a starry night sky.",
        "I’m thankful for the strength to overcome challenges in my life.",
        "I’m grateful for the technology that keeps me connected to the world.",
        "I appreciate the creativity that brings joy and inspiration into my life.",
        "I’m thankful for the kindness of strangers who brighten my day.",
        "I’m grateful for the fresh air and the ability to take a deep breath.",
        "I appreciate the peaceful moments that allow me to recharge.",
        "I’m thankful for the lessons I’ve learned from past experiences.",
        "I’m grateful for the opportunity to express myself through art or writing.",
        "I appreciate the healing power of a good laugh.",
        "I’m thankful for mentors and role models who guide me.",
        "I’m grateful for the freedom to make my own choices.",
        "I appreciate the simple joys, like a cup of coffee or tea in the morning.",
        "I’m thankful for the resilience and strength within me to keep going.",
      ];

      // Select a random gratitude idea
      const randomIndex = Math.floor(Math.random() * gratitudeIdeas.length);
      const randomEntry = gratitudeIdeas[randomIndex];

      this.newEntry = randomEntry;
    },

    async deleteEntry() {
      if (!this.currentEntry || !this.currentEntry.id) {
        throw new Error("No entry selected for deletion");
      }

      this.loading = true;
      this.error = null;

      const { $db } = useNuxtApp();

      try {
        // Remove the document from Firestore
        const docRef = doc($db, "gratitudeEntries", this.currentEntry.id);
        await deleteDoc(docRef);

        // Remove the entry from the Pinia store
        this.gratitudeEntries = this.gratitudeEntries.filter(
          (entry) => entry.id !== this.currentEntry?.id
        );

        // Reset the current entry and form state
        this.handleResetEntry();
        console.log("Entry successfully deleted!");
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Failed to delete the entry from Firestore.";
        console.error("Error deleting Gratitude entry:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
