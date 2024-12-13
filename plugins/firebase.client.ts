// plugins/firebase.client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

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

  // nuxtApp.provide("firebase", { auth, db }); // we provide auth and db to the whole app
  nuxtApp.provide("db", db);
  nuxtApp.provide("auth", auth);
});

// Access using useNuxtApp
// const { $firestore } = useNuxtApp(); //$ is a convnetion for globally provided value
