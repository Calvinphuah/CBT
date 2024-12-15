import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  updateDoc,
  addDoc,
  deleteDoc,
  type Query,
  type DocumentData,
} from "firebase/firestore";

export const useFirestore = () => {
  const { $db } = useNuxtApp();
  const subscriptions = ref<(() => void)[]>([]);

  // Generic subscription for collections
  const subscribeToCollection = <T>(
    collectionName: string,
    callback: (data: T[]) => void,
    queryConstraints: any[] = []
  ) => {
    const collectionRef = collection($db, collectionName);
    const q = query(collectionRef, ...queryConstraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
      callback(items);
    });

    subscriptions.value.push(unsubscribe);
    return unsubscribe;
  };

  // Generic subscription handler for a single document
  const subscribeToDocument = <T>(
    collectionName: string,
    documentId: string,
    callback: (data: T) => void
  ) => {
    const docRef = doc($db, collectionName, documentId);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        callback({
          id: snapshot.id,
          ...snapshot.data(),
        } as T);
      }
    });

    subscriptions.value.push(unsubscribe);
    return unsubscribe;
  };

  // CRUD operations
  const addDocument = async <T extends DocumentData>(
    collectionName: string,
    data: T
  ) => {
    const collectionRef = collection($db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  };

  const updateDocument = async (
    collectionName: string,
    documentId: string,
    data: Partial<DocumentData>
  ) => {
    const docRef = doc($db, collectionName, documentId);
    await updateDoc(docRef, data);
  };

  const deleteDocument = async (collectionName: string, documentId: string) => {
    const docRef = doc($db, collectionName, documentId);
    await deleteDoc(docRef);
  };

  // Cleanup function
  const cleanup = () => {
    subscriptions.value.forEach((unsubscribe) => unsubscribe());
    subscriptions.value = [];
  };

  return {
    subscribeToCollection,
    subscribeToDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    cleanup,
  };
};
