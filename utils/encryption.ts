import CryptoJS from "crypto-js";

// Define a generic type for the data
type EncryptableData = Record<string, unknown> | unknown[];

export function secureEncrypt(data: EncryptableData): string {
  const config = useRuntimeConfig();
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.public.encryptionSecretKey
  ).toString();
}

export async function serverDecrypt<T = unknown>(
  encryptedData: string
): Promise<T> {
  const config = useRuntimeConfig();
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    config.encryptionPrivateKey
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
}
