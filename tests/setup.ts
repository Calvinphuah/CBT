import { vi } from "vitest";

// 🔥 Fully Mock a Firebase Authenticated User
const mockUser = {
  uid: "mock-user-123",
  email: "test@example.com",
  displayName: "Mock User",
  photoURL: "https://example.com/mock-profile.jpg",
  emailVerified: true,
  phoneNumber: "+123456789",
  providerId: "firebase",
  metadata: {
    creationTime: "2023-01-01T12:00:00.000Z",
    lastSignInTime: "2023-06-01T18:30:00.000Z",
  },
  reload: vi.fn(),
  getIdToken: vi.fn(() => Promise.resolve("mock-id-token")),
};

// 🔥 Correctly mock `#app` with both `useNuxtApp()` and `defineNuxtPlugin()`
vi.mock("#app", () => ({
  useNuxtApp: () => ({
    $auth: {
      currentUser: mockUser, // ✅ Ensure Firebase user structure is correct
    },
    $db: "mocked-db", // ✅ Fake Firestore instance
  }),
  defineNuxtPlugin: vi.fn(), // ✅ Required to prevent Vitest errors
}));
