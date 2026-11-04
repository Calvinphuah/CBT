<template>
  <component
    :is="homeByStyle[style]"
    :day-and-time="dayAndTime"
    :prompt="prompt"
    :week-days="weekDays"
    :week-count="weekCount"
    :latest-entry="latestEntry"
    :latest-day="latestDay"
    :recent-entries="recentEntries"
    :first-name="firstName"
    :initial="initial"
    @start="startRecord"
    @open="openEntry"
    @account="isAccountOpen = true"
  />
</template>

<script setup lang="ts">
import type { CBTEntry } from "@/types/cbt";
import { HomeClearing, HomeCompanion, HomeWorkbook } from "#components";

useHead({ title: "Home" });

const cbtStore = useCBTStore();
const authStore = useAuthStore();
const isAccountOpen = useState("account-sheet-open", () => false);
const { style } = useAppStyle();

const homeByStyle = {
  clearing: HomeClearing,
  workbook: HomeWorkbook,
  companion: HomeCompanion,
};

const now = new Date();
const dayAndTime = formatDayAndTime(now);
const prompt = isEvening(now)
  ? "What’s clouding your mind tonight?"
  : "What’s on your mind today?";

const entryDates = computed(() =>
  cbtStore.cbtEntries.map((entry) => entry.createdAt.toDate())
);
const weekDays = computed(() => weekDaysWithEntries(entryDates.value, now));
const weekCount = computed(() => countThisWeek(entryDates.value, now));

const latestEntry = computed(() => cbtStore.cbtEntries[0]);
const latestDay = computed(() =>
  latestEntry.value
    ? latestEntry.value.createdAt.toDate().toLocaleDateString("en-US", { weekday: "long" })
    : ""
);
const recentEntries = computed(() => cbtStore.cbtEntries.slice(0, 3));

const displayName = computed(
  () => authStore.user?.displayName || authStore.user?.email || "Account"
);
const firstName = computed(() => authStore.user?.displayName?.split(" ")[0] || "there");
const initial = computed(() => displayName.value.charAt(0).toUpperCase());

const startRecord = () => {
  cbtStore.handleNewEntry();
  navigateTo("/cbt");
};

const openEntry = (entry: CBTEntry) => {
  cbtStore.handleViewEntry(entry);
  navigateTo("/cbt");
};

onMounted(() => {
  if (!cbtStore.cbtEntries.length) cbtStore.fetchEntries();
});
</script>
