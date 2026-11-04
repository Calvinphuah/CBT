<template>
  <div class="flex flex-col gap-5">
    <MeditationModal
      v-if="selectedMeditation"
      :is-visible="isModalVisible"
      :meditation="selectedMeditation"
      :is-favorite="favorites.includes(selectedMeditation.id)"
      @toggle-favorite="toggleFavorite"
      @close="closeModal"
    />

    <button
      v-if="featured"
      type="button"
      class="card overflow-hidden text-left"
      @click="openModal(featured)"
    >
      <span class="card-art block h-[150px]">
        <CommonIllustration alt="" :variant="evening ? 'night' : 'banner'" />
      </span>
      <span class="flex items-center gap-3 px-4 py-3.5">
        <span class="min-w-0 flex-1">
          <span class="block text-[13px] font-semibold text-ink-3">{{ featuredLabel }}</span>
          <span class="text-heading block">{{ featured.title }}</span>
          <span class="block text-[15px] text-ink-2">{{ featured.time.replace("mins", "min") }}</span>
        </span>
        <span class="icon-btn-filled size-[52px]">
          <PlayIcon class="size-6" aria-hidden="true" />
        </span>
      </span>
    </button>

    <section v-if="favoriteCards.length">
      <h2 class="day-label">Your favourites</h2>
      <MeditationCard
        v-for="card in favoriteCards"
        :key="card.id"
        :card="card"
        :is-favorite="true"
        @open-modal="openModal"
      />
    </section>

    <section>
      <h2 class="day-label">All meditations</h2>
      <MeditationCard
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :is-favorite="favorites.includes(card.id)"
        @open-modal="openModal"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { PlayIcon } from "@heroicons/vue/24/solid";

interface Card {
  id: string;
  title: string;
  description: string;
  time: string;
}

const { cards } = defineProps<{
  cards: Card[];
}>();

const isModalVisible = ref(false);
const selectedMeditation = ref<Card | null>(null);
const favorites = ref<string[]>([]);

// Suggest the sleep track in the evening and the short body scan during the day.
const evening = isEvening(new Date());
const featuredLabel = evening ? "Tonight" : "Today";
const featured = computed(() =>
  cards.find((card) =>
    card.id === (evening ? "body-scan-for-sleep" : "short-body-scan")
  )
);

function openModal(card: Card) {
  selectedMeditation.value = card;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  selectedMeditation.value = null;
}

function toggleFavorite(cardId: string) {
  if (favorites.value.includes(cardId)) {
    favorites.value = favorites.value.filter((id) => id !== cardId);
  } else {
    favorites.value.push(cardId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
}

const favoriteCards = computed(() => {
  return cards.filter((card) => favorites.value.includes(card.id));
});

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
});
</script>
