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
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { GratitudeEntry, GratitudeState } from "@/types/gratitude";

export const useGratitudeStore = defineStore("gratitudeStore", {
  state: (): GratitudeState => ({
    newEntry: "",
    gratitudeEntries: [],
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

        const newEntries = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            // Type assertion to ensure all required fields are present
            const entry: GratitudeEntry = {
              id: doc.id,
              entry: data.entry as string,
              createdAt: data.createdAt as Timestamp,
              userId: data.userId as string,
            };
            return entry;
          }
        );

        this.gratitudeEntries = loadMore
          ? [...this.gratitudeEntries, ...newEntries]
          : newEntries;

        // Update the last visible document
        this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to fetch entries";
        console.error("Error fetching Gratitude entries:", error);
      } finally {
        this.loading = false;
      }
    },

    async addEntry(entry: string) {
      this.loading = true;
      this.error = null;

      const { $db, $auth } = useNuxtApp();

      if (!$auth.currentUser?.uid) {
        throw new Error("User not authenticated");
      }

      const newEntry: Omit<GratitudeEntry, "id"> = {
        entry,
        createdAt: Timestamp.now(),
        userId: $auth.currentUser.uid,
      };

      try {
        const docRef = await addDoc(
          collection($db, "gratitudeEntries"),
          newEntry
        );

        const entryWithId: GratitudeEntry = {
          ...newEntry,
          id: docRef.id,
        };

        this.gratitudeEntries.unshift(entryWithId);
        this.handleResetEntry();
        return docRef.id;
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to add entry";
        console.error("Error adding Gratitude entry:", error);
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

    // handleEditEntry(entry: GratitudeEntry) {
    //   this.isEditing = true;
    //   this.isNewEntry = false;
    //   // this.entry = entry.entry;
    // },

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
  },
});
