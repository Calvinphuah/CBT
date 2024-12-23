export interface CBTEntry {
  id: string;
  activatingEvent: string;
  beliefs: string;
  consequentFeelings: string;
  disputes: string;
  createdAt: Date;
  userId: string;
}

export interface CBTState {
  cbtEntries: CBTEntry[];
  loading: boolean;
  error: string | null;
}
