import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCBTStore } from "@/stores/cbt.store";
import type { CBTState, CBTEntry } from "~/types/cbt";
import { Timestamp } from "firebase/firestore";

// 🔥 Mock Firestore Functions
vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(() => Promise.resolve({ id: "new-entry-id" })),
  updateDoc: vi.fn(() => Promise.resolve()),
  deleteDoc: vi.fn(() => Promise.resolve()),
  collection: vi.fn(() => "mocked-collection"),
  doc: vi.fn(() => "mocked-doc"),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  getDocs: vi.fn(() =>
    Promise.resolve({
      docs: [
        {
          id: "123",
          data: () => ({
            activatingEvent: "Mock Event",
            beliefs: "Mock Belief",
            consequentFeelings: "Mock Feelings",
            disputes: "Mock Dispute",
            userId: "user-123",
            createdAt: { seconds: 1234567890, nanoseconds: 0 },
          }),
        },
      ],
    })
  ),
  Timestamp: {
    now: () => ({ seconds: 1234567890, nanoseconds: 0 }),
    fromDate: (date: Date) => ({
      seconds: Math.floor(date.getTime() / 1000),
      nanoseconds: 0,
    }),
  },
}));

describe("CBT Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Activate Pinia before each test
  });

  it("initializes with default state", () => {
    const cbtStore = useCBTStore();
    const expectedState: CBTState = {
      cbtEntries: [],
      formData: {
        activating: "",
        beliefs: "",
        consequentFeelings: "",
        dispute: "",
      },
      originalFormData: null,
      isEditing: false,
      isNewEntry: false,
      isViewing: false,
      selectedEntry: null,
      loading: false,
      error: null,
    };

    expect(cbtStore.$state).toEqual(expectedState);
  });

  it("resets form correctly", () => {
    const cbtStore = useCBTStore();
    cbtStore.formData.activating = "Something";
    cbtStore.resetForm();
    expect(cbtStore.formData.activating).toBe("");
  });

  it("populates form correctly", () => {
    const cbtStore = useCBTStore();
    const mockEntry: CBTEntry = {
      id: "123",
      activatingEvent: "Event",
      beliefs: "Belief",
      consequentFeelings: "Feelings",
      disputes: "Dispute",
      userId: "user-123",
      createdAt: Timestamp.fromDate(new Date()),
    };

    cbtStore.populateForm(mockEntry);

    expect(cbtStore.formData).toEqual({
      activating: "Event",
      beliefs: "Belief",
      consequentFeelings: "Feelings",
      dispute: "Dispute",
    });

    expect(cbtStore.isNewEntry).toBe(false);
    expect(cbtStore.selectedEntry).toEqual(mockEntry);
  });

  // it("adds a new entry successfully", async () => {
  //   const cbtStore = useCBTStore();
  //   const entry = {
  //     activatingEvent: "Test Event",
  //     beliefs: "Test Belief",
  //     consequentFeelings: "Test Feelings",
  //     disputes: "Test Dispute",
  //   };

  //   await cbtStore.addEntry(entry);
  //   expect(vi.mocked(addDoc)).toHaveBeenCalled();
  // });

  // it("updates an entry successfully", async () => {
  //   const cbtStore = useCBTStore();
  //   const entryId = "123";
  //   const updates = { beliefs: "Updated Belief" };

  //   await cbtStore.updateEntry(entryId, updates, updates);
  //   expect(vi.mocked(updateDoc)).toHaveBeenCalled();
  // });

  // it("deletes an entry successfully", async () => {
  //   const cbtStore = useCBTStore();
  //   cbtStore.selectedEntry = { id: "123" };

  //   await cbtStore.deleteEntry();
  //   expect(vi.mocked(deleteDoc)).toHaveBeenCalled();
  // });

  // it("fetches entries correctly", async () => {
  //   const cbtStore = useCBTStore();
  //   await cbtStore.fetchEntries();

  //   expect(vi.mocked(getDocs)).toHaveBeenCalled();
  //   expect(cbtStore.cbtEntries.length).toBeGreaterThan(0);
  // });

  it("computes form validity correctly", () => {
    const cbtStore = useCBTStore();
    expect(cbtStore.isFormValid).toBe(false);

    cbtStore.formData = {
      activating: "Event",
      beliefs: "Belief",
      consequentFeelings: "Feelings",
      dispute: "Dispute",
    };
    expect(cbtStore.isFormValid).toBe(true);
  });
});
