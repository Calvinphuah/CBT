// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "@nuxt/fonts",
    "@nuxtjs/seo",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      encryptionSecretKey: process.env.NUXT_ENCRYPTION_SECRET_KEY || "",
    },
    private: {},
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  plugins: ["@/plugins/firebase.client.ts", "@/plugins/authSetup.client.ts"],
  app: {
    head: {
      title: "Cogni",
      titleTemplate: "%s | Cogni",
      meta: [{ name: "Cogni", content: "Cognitive behavioural therapy app" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap",
        },
      ],
    },
  },
  googleFonts: {
    families: {
      "Nunito+Sans": [400, 700],
    },
    display: "swap",
    subsets: ["latin"],
    preconnect: true,
  },
});
