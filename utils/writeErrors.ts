// Stores throw this before writing, because Firestore waits for the server and an offline write would hang.
export const OFFLINE_ERROR = "offline";

export function assertOnline(): void {
  if (!navigator.onLine) throw new Error(OFFLINE_ERROR);
}

const isOffline = (error: unknown) =>
  error instanceof Error && error.message === OFFLINE_ERROR;

// Kind wording for a failed save, so people know their words are still there.
export function saveErrorMessage(error: unknown): string {
  return isOffline(error)
    ? "You’re offline. Your words are still here, so try again when you’re connected."
    : "Couldn’t save. Your words are still here, so try again.";
}

// Kind wording for a failed delete, so nobody thinks it went through.
export function deleteErrorMessage(error: unknown): string {
  return isOffline(error)
    ? "You’re offline, so it wasn’t deleted. Try again when you’re connected."
    : "Couldn’t delete it. Please try again.";
}
