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
    "@vite-pwa/nuxt",
    "@nuxt/test-utils/module",
  ],
  pwa: {
    // Apply new versions on the next launch; the app has no "update available" prompt.
    registerType: "autoUpdate",
    manifest: {
      id: "/",
      name: "Cogni: CBT, gratitude and meditation",
      short_name: "Cogni",
      description:
        "Work through anxious thoughts with CBT, keep track of small good things, and listen to guided meditations.",
      lang: "en",
      start_url: "/",
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      theme_color: "#F5F7FA",
      background_color: "#F5F7FA",
      categories: ["health", "lifestyle", "medical"],
      icons: [
        {
          src: "/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/icon-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      shortcuts: [
        {
          name: "New thought record",
          short_name: "New record",
          url: "/cbt?new=1",
          icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
        },
        {
          name: "Gratitude",
          url: "/gratitude",
          icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
        },
        {
          name: "Meditate",
          url: "/meditation",
          icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
        },
      ],
      screenshots: [
        {
          src: "/screenshots/mobile-home.png",
          sizes: "390x844",
          type: "image/png",
          form_factor: "narrow",
          label: "Home: start a thought record",
        },
        {
          src: "/screenshots/mobile-thought-record.png",
          sizes: "390x844",
          type: "image/png",
          form_factor: "narrow",
          label: "Answer a worrying thought with a clearer view",
        },
        {
          src: "/screenshots/desktop-home.png",
          sizes: "1280x800",
          type: "image/png",
          form_factor: "wide",
          label: "Cogni on desktop",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      navigateFallbackDenylist: [/^\/__nuxt_devtools__/],
      // Precache the app shell, fonts and artwork so it opens offline; audio is streamed.
      globPatterns: ["**/*.{js,css,html,png,svg,jpg,ico,woff2,webmanifest}"],
      globIgnores: ["screenshots/**"],
    },
    client: {
      installPrompt: false,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },

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
  nitro: {
    preset: "static",
    // output: {
    //   dir: "dist",
    // },
  },
  plugins: ["@/plugins/firebase.client.ts", "@/plugins/authSetup.client.ts"],
  app: {
    head: {
      title: "Cogni",
      titleTemplate: "%s | Cogni",
      meta: [
        { name: "Cogni", content: "Cognitive behavioural therapy app" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-title", content: "Cogni" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "default",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/img/logo-mark.svg",
        },
        { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      ],
    },
  },
  fonts: {
    // Each style names its fonts only through CSS variables, so load them all globally.
    families: [
      {
        name: "Figtree",
        provider: "google",
        weights: [400, 500, 600, 700],
        global: true,
      },
      {
        name: "Bricolage Grotesque",
        provider: "google",
        weights: [600, 700, 800],
        global: true,
      },
      {
        name: "Schibsted Grotesk",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        global: true,
      },
      { name: "Caveat", provider: "google", weights: [600, 700], global: true },
      {
        name: "Gabarito",
        provider: "google",
        weights: [600, 700, 800],
        global: true,
      },
      {
        name: "Onest",
        provider: "google",
        weights: [400, 500, 600, 700],
        global: true,
      },
    ],
  },
});
