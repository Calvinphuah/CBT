// tests/mocks/firebase.ts
import { vi } from "vitest";

const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((callback) => {
    callback(null);
    return vi.fn();
  }),
};

const mockFirestore = {
  collection: vi.fn(() => ({
    doc: vi.fn(),
    get: vi.fn(),
    where: vi.fn(),
    onSnapshot: vi.fn(),
  })),
  doc: vi.fn(),
};

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => mockAuth),
  signInWithEmailAndPassword: mockAuth.signInWithEmailAndPassword,
  signOut: mockAuth.signOut,
  onAuthStateChanged: mockAuth.onAuthStateChanged,
}));

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => mockFirestore),
  collection: mockFirestore.collection,
  doc: mockFirestore.doc,
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

export { mockAuth, mockFirestore };
