import type { Ref } from "vue";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Moves focus into a dialog, keeps Tab inside it, and gives focus back when it closes.
export function useDialogFocus(panel: Ref<HTMLElement | null>, isOpen: () => boolean) {
  let returnFocusTo: HTMLElement | null = null;

  watch(
    isOpen,
    async (open) => {
      if (!import.meta.client) return;
      if (open) {
        returnFocusTo = document.activeElement as HTMLElement | null;
        await nextTick();
        // The panel, not a field, so phones don't pop the keyboard; screen readers read the dialog name.
        panel.value?.focus();
        return;
      }
      if (returnFocusTo?.isConnected) returnFocusTo.focus();
      returnFocusTo = null;
    },
    { immediate: true }
  );

  useEventListener("keydown", (event: KeyboardEvent) => {
    if (!isOpen() || event.key !== "Tab" || !panel.value) return;

    const focusable = [...panel.value.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === panel.value)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
