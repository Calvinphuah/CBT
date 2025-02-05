import type { Timestamp } from "firebase/firestore";
export interface CBTEntry {
  id: string;
  activatingEvent: string;
  beliefs: string;
  consequentFeelings: string;
  disputes: string;
  createdAt: Timestamp;
  userId: string;
}

export interface CBTState {
  cbtEntries: CBTEntry[];
  isEditing: boolean;
  isNewEntry: boolean;
  isViewing: boolean;
  selectedEntry: CBTEntry | null;
  loading: boolean;
  error: string | null;
  formData: { [key: string]: string };
  originalFormData: { [key: string]: string } | null;
}
