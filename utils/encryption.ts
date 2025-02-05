/**
 * Retrieves the encryption key from runtime config.
 */
async function getEncryptionKey(): Promise<CryptoKey> {
  const config = useRuntimeConfig();
  const rawKey = config.public.encryptionSecretKey;

  if (!rawKey) {
    throw new Error(
      "Encryption key is missing from environment configuration."
    );
  }

  // Convert hex string to Uint8Array
  const keyBuffer = new Uint8Array(
    rawKey.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );

  // Import the key into Web Crypto API
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts only specified fields in an object using Web Crypto API.
 * @param data - The object to be encrypted.
 * @param fieldsToEncrypt - An array of field names to encrypt.
 * @returns The object with specified fields encrypted.
 */
export async function secureEncrypt<T extends object>(
  data: T,
  fieldsToEncrypt: (keyof T)[]
): Promise<T> {
  const key = await getEncryptionKey();
  const encryptedData = { ...data };

  for (const field of fieldsToEncrypt) {
    if (data[field] !== undefined) {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(JSON.stringify(data[field]));

      const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodedData
      );

      encryptedData[field] = `${btoa(String.fromCharCode(...iv))}:${btoa(
        String.fromCharCode(...new Uint8Array(encrypted))
      )}` as unknown as T[typeof field];
    }
  }

  return encryptedData;
}

/**
 * Decrypts only specified fields in an object using Web Crypto API.
 * @param data - The object with encrypted fields.
 * @param fieldsToDecrypt - An array of field names to decrypt.
 * @returns The object with specified fields decrypted.
 */
export async function serverDecrypt<T extends object>(
  data: T,
  fieldsToDecrypt: (keyof T)[]
): Promise<T> {
  const key = await getEncryptionKey();
  const decryptedData = { ...data };

  for (const field of fieldsToDecrypt) {
    if (typeof data[field] === "string") {
      try {
        const [ivBase64, encryptedTextBase64] = (data[field] as string).split(
          ":"
        );
        const iv = new Uint8Array(
          [...atob(ivBase64)].map((char) => char.charCodeAt(0))
        );
        const encryptedBytes = new Uint8Array(
          [...atob(encryptedTextBase64)].map((char) => char.charCodeAt(0))
        );

        const decrypted = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv },
          key,
          encryptedBytes
        );

        decryptedData[field] = JSON.parse(
          new TextDecoder().decode(decrypted)
        ) as T[typeof field];
      } catch (error) {
        console.error(`Error decrypting field "${String(field)}":`, error);
      }
    }
  }

  return decryptedData;
}
