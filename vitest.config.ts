import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    // Fake values so the app boots in tests without a real .env.
    environmentOptions: {
      nuxt: {
        overrides: {
          runtimeConfig: {
            public: {
              firebaseApiKey: "test-api-key",
              firebaseProjectId: "demo-cogni",
              encryptionSecretKey: "test-encryption-key-32-chars-ok!",
            },
          },
        },
      },
    },
  },
});
