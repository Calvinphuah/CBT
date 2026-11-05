<template>
  <aside
    class="sticky top-0 hidden h-screen flex-col gap-1 border-r border-rule px-4 py-7 md:flex"
  >
    <div class="px-3.5 pb-6"><CommonLogo /></div>

    <nav class="flex flex-col gap-1" aria-label="Main">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex h-11 items-center gap-2.5 rounded-xl px-3.5 text-[15px] font-semibold text-ink-2 transition-colors hover:bg-sunken"
        :class="{ 'tab-on bg-surface text-ink ring-1 ring-rule': isActive(item.to) }"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        <component
          :is="item.icon"
          class="size-5"
          :stroke-width="isActive(item.to) ? 2 : 1.6"
          aria-hidden="true"
        />
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="flex-1" />

    <button
      type="button"
      class="flex h-11 items-center gap-3 rounded-xl px-3.5 text-left text-[15px] font-semibold text-ink-2 transition-colors hover:bg-sunken"
      @click="isAccountOpen = true"
    >
      <span
        class="grid size-7 place-items-center rounded-full bg-sky-tint text-[13px] font-bold text-ink"
        >{{ initial }}</span
      >
      <span class="truncate">{{ displayName }}</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import {
  CloudIcon,
  HeartIcon,
  HomeIcon,
  MoonIcon,
} from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
const route = useRoute();
const isAccountOpen = useState("account-sheet-open", () => false);

const navItems = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Thoughts", to: "/cbt", icon: CloudIcon },
  { label: "Gratitude", to: "/gratitude", icon: HeartIcon },
  { label: "Meditate", to: "/meditation", icon: MoonIcon },
];

const displayName = computed(
  () => authStore.user?.displayName || authStore.user?.email || "Account"
);
const initial = computed(() => displayName.value.charAt(0).toUpperCase());

const isActive = (to: string) =>
  to === "/" ? route.path === "/" : route.path.startsWith(to);
</script>
