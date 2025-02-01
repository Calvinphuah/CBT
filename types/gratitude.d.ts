import type { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
export interface GratitudeEntry {
  id: string;
  entry: string;
  createdAt: Timestamp;
  userId: string;
  image?: string;
}

export interface GratitudeState {
  gratitudeEntries: GratitudeEntry[];
  newEntry: string;
  isEditing: boolean;
  isNewEntry: boolean;
  selectedEntry: GratitudeEntry | null;
  loading: boolean;
  error: string | null;
  lastVisible: QueryDocumentSnapshot | null;
  allLoaded: boolean;
  currentEntry: GratitudeEntry | null;
}
