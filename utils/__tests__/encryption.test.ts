import { describe, it, expect } from "vitest";
import { secureEncrypt, serverDecrypt } from "@/utils/encryption";
import { useRuntimeConfig } from "#app";

describe("Encryption Utils", () => {
  const testData = { name: "Alice", email: "alice@example.com" };
  let encryptedData: typeof testData;

  it("uses encryption key from .env", () => {
    const config = useRuntimeConfig();
    expect(config.public.encryptionSecretKey).toBeDefined();
  });

  it("encrypts specified fields", async () => {
    encryptedData = await secureEncrypt(testData, ["name", "email"]);

    // Ensure encrypted fields are not the same as the original
    expect(encryptedData.name).not.toBe(testData.name);
    expect(encryptedData.email).not.toBe(testData.email);

    // Ensure encrypted values are base64 encoded strings with IV
    expect(typeof encryptedData.name).toBe("string");
    expect(typeof encryptedData.email).toBe("string");
    expect(encryptedData.name.includes(":")).toBe(true);
    expect(encryptedData.email.includes(":")).toBe(true);
  });

  it("decrypts encrypted fields correctly", async () => {
    const decryptedData = await serverDecrypt(encryptedData, ["name", "email"]);

    // Ensure decrypted values match the original
    expect(decryptedData.name).toBe(testData.name);
    expect(decryptedData.email).toBe(testData.email);
  });
});
