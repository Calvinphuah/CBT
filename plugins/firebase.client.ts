// plugins/firebase.client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Add console.log to debug configuration
  //   console.log("Firebase Config:", {
  //     apiKey: config.public.firebaseApiKey,
  //     authDomain: config.public.firebaseAuthDomain,
  //     projectId: config.public.firebaseProjectId,
  //     storageBucket: config.public.firebaseStorageBucket,
  //     messagingSenderId: config.public.firebaseMessagingSenderId,
  //     appId: config.public.firebaseAppId,
  //   });

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
  const firestore = getFirestore(app);

  nuxtApp.provide("firebase", { auth, firestore });
});
