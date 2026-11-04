// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, it, beforeAll, beforeEach, afterAll } from "vitest";
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

// Needs the Firestore emulator (and Java): npm run test:rules
const emulatorRunning = !!process.env.FIRESTORE_EMULATOR_HOST;

const ALICE = "alice";
const BOB = "bob";

const cbtEntry = (userId: string) => ({
  activatingEvent: "iv:event",
  beliefs: "iv:beliefs",
  consequentFeelings: "iv:feelings",
  disputes: "iv:disputes",
  createdAt: Timestamp.now(),
  userId,
});

const gratitudeEntry = (userId: string) => ({
  entry: "iv:entry",
  createdAt: Timestamp.now(),
  userId,
  image: "/img/leaf.png",
});

describe.skipIf(!emulatorRunning)("firestore.rules", () => {
  let testEnv: RulesTestEnvironment;

  const dbAs = (uid: string) => testEnv.authenticatedContext(uid).firestore();

  const seed = async (path: string, id: string, data: object) => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), path, id), data);
    });
  };

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "demo-cogni",
      firestore: { rules: readFileSync("firestore.rules", "utf8") },
    });
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  describe("cbtEntries", () => {
    it("lets a user create their own entry", async () => {
      await assertSucceeds(addDoc(collection(dbAs(ALICE), "cbtEntries"), cbtEntry(ALICE)));
    });

    it("blocks creating an entry for someone else", async () => {
      await assertFails(addDoc(collection(dbAs(ALICE), "cbtEntries"), cbtEntry(BOB)));
    });

    it("blocks signed-out users", async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(addDoc(collection(db, "cbtEntries"), cbtEntry(ALICE)));
    });

    it("blocks unknown fields", async () => {
      await assertFails(
        addDoc(collection(dbAs(ALICE), "cbtEntries"), { ...cbtEntry(ALICE), isAdmin: true })
      );
    });

    it("blocks text over 50k chars", async () => {
      await assertFails(
        addDoc(collection(dbAs(ALICE), "cbtEntries"), {
          ...cbtEntry(ALICE),
          beliefs: "x".repeat(50001),
        })
      );
    });

    it("runs the app's list query for the owner only", async () => {
      await seed("cbtEntries", "a1", cbtEntry(ALICE));
      await assertSucceeds(
        getDocs(
          query(
            collection(dbAs(ALICE), "cbtEntries"),
            where("userId", "==", ALICE),
            orderBy("createdAt", "desc")
          )
        )
      );
      await assertFails(getDocs(collection(dbAs(ALICE), "cbtEntries")));
      await assertFails(getDoc(doc(dbAs(BOB), "cbtEntries", "a1")));
    });

    it("lets the owner edit the text fields like the app does", async () => {
      await seed("cbtEntries", "a1", cbtEntry(ALICE));
      await assertSucceeds(
        updateDoc(doc(dbAs(ALICE), "cbtEntries", "a1"), {
          activatingEvent: "iv:new",
          beliefs: "iv:new",
          consequentFeelings: "iv:new",
          disputes: "iv:new",
        })
      );
    });

    it("blocks changing userId or createdAt", async () => {
      await seed("cbtEntries", "a1", cbtEntry(ALICE));
      await assertFails(updateDoc(doc(dbAs(ALICE), "cbtEntries", "a1"), { userId: BOB }));
      await assertFails(
        updateDoc(doc(dbAs(ALICE), "cbtEntries", "a1"), { createdAt: Timestamp.now() })
      );
    });

    it("blocks another user editing or deleting", async () => {
      await seed("cbtEntries", "a1", cbtEntry(ALICE));
      await assertFails(updateDoc(doc(dbAs(BOB), "cbtEntries", "a1"), { beliefs: "iv:x" }));
      await assertFails(deleteDoc(doc(dbAs(BOB), "cbtEntries", "a1")));
    });

    it("lets the owner delete", async () => {
      await seed("cbtEntries", "a1", cbtEntry(ALICE));
      await assertSucceeds(deleteDoc(doc(dbAs(ALICE), "cbtEntries", "a1")));
    });
  });

  describe("gratitudeEntries", () => {
    it("lets a user create their own entry, with or without an image", async () => {
      await assertSucceeds(
        addDoc(collection(dbAs(ALICE), "gratitudeEntries"), gratitudeEntry(ALICE))
      );
      const { image: _image, ...withoutImage } = gratitudeEntry(ALICE);
      await assertSucceeds(addDoc(collection(dbAs(ALICE), "gratitudeEntries"), withoutImage));
    });

    it("blocks a non-string image", async () => {
      await assertFails(
        addDoc(collection(dbAs(ALICE), "gratitudeEntries"), { ...gratitudeEntry(ALICE), image: 1 })
      );
    });

    it("runs the app's paged list query for the owner", async () => {
      await seed("gratitudeEntries", "g1", gratitudeEntry(ALICE));
      await assertSucceeds(
        getDocs(
          query(
            collection(dbAs(ALICE), "gratitudeEntries"),
            where("userId", "==", ALICE),
            orderBy("createdAt", "desc")
          )
        )
      );
    });

    it("lets the owner edit only the entry text", async () => {
      await seed("gratitudeEntries", "g1", gratitudeEntry(ALICE));
      await assertSucceeds(updateDoc(doc(dbAs(ALICE), "gratitudeEntries", "g1"), { entry: "iv:new" }));
      await assertFails(updateDoc(doc(dbAs(ALICE), "gratitudeEntries", "g1"), { image: "/x.png" }));
    });

    it("lets the owner delete but not others", async () => {
      await seed("gratitudeEntries", "g1", gratitudeEntry(ALICE));
      await assertFails(deleteDoc(doc(dbAs(BOB), "gratitudeEntries", "g1")));
      await assertSucceeds(deleteDoc(doc(dbAs(ALICE), "gratitudeEntries", "g1")));
    });
  });

  it("denies every other collection", async () => {
    await assertFails(
      addDoc(collection(dbAs(ALICE), "data"), { userId: ALICE, createdBy: "a@b.c" })
    );
  });
});
