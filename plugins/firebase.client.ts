// plugins/firebase.client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  // if (process.env.NODE_ENV === "test") return;

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return { provide: { auth, db } };
  // nuxtApp.provide("firebase", { auth, db }); // we provide auth and db to the whole app
  // To use this add nuxtApp as argument
  // nuxtApp.provide("db", db);
  // nuxtApp.provide("auth", auth);
});
