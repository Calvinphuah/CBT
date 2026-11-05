<template>
  <nav
    v-if="isVisible"
    class="fixed inset-x-0 bottom-0 z-[100] flex justify-around border-t border-rule bg-page/95 px-2 pt-1.5 backdrop-blur md:hidden"
    :style="{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }"
    aria-label="Main"
  >
    <NuxtLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="flex min-h-11 w-[76px] flex-col items-center gap-0.5 rounded-xl py-1 text-[11px] font-semibold"
      :class="isActive(item.to) ? 'tab-on text-ink' : 'text-ink-3'"
      :aria-current="isActive(item.to) ? 'page' : undefined"
    >
      <component
        :is="item.icon"
        class="size-6"
        :stroke-width="isActive(item.to) ? 2 : 1.6"
        aria-hidden="true"
      />
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import {
  CloudIcon,
  HeartIcon,
  HomeIcon,
  MoonIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const cbtStore = useCBTStore();

const navItems = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Thoughts", to: "/cbt", icon: CloudIcon },
  { label: "Gratitude", to: "/gratitude", icon: HeartIcon },
  { label: "Meditate", to: "/meditation", icon: MoonIcon },
];

const isActive = (to: string) =>
  to === "/" ? route.path === "/" : route.path.startsWith(to);

// The thought record flow has its own buttons where the tab bar would be.
const isInRecordFlow = computed(
  () => route.path.startsWith("/cbt") && (cbtStore.isNewEntry || cbtStore.isEditing)
);

const isKeyboardOpen = ref(false);

// iOS keeps window.innerHeight fixed when the keyboard opens; only visualViewport shrinks
const handleResize = () => {
  const visibleHeight = window.visualViewport?.height ?? window.innerHeight;
  isKeyboardOpen.value = visibleHeight < screen.height * 0.7;
};

const isVisible = computed(() => !isKeyboardOpen.value && !isInRecordFlow.value);

onMounted(() => {
  window.visualViewport?.addEventListener("resize", handleResize);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.visualViewport?.removeEventListener("resize", handleResize);
  window.removeEventListener("resize", handleResize);
});
</script>
