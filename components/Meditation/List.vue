<template>
  <div class="max-w-lg p-4 mx-auto space-y-6">
    <div class="flex items-center justify-between px-10 py-4">
      <img
        src="../../public/img/landing-meditation.png"
        alt="Meditation"
        class="w-32"
      />
      <h2 class="text-lg font-semibold">Take time <br />to unwind</h2>
    </div>

    <MeditationModal
      v-if="selectedMeditation"
      :is-visible="isModalVisible"
      :meditation="selectedMeditation"
      :is-favorite="favorites.includes(selectedMeditation.id)"
      @toggle-favorite="toggleFavorite"
      @close="closeModal"
    />

    <h2 class="mt-2 text-xl font-bold">Favorite Meditations</h2>
    <MeditationCard
      v-for="card in favoriteCards"
      :key="card.id"
      :card="card"
      :is-favorite="true"
      @open-modal="openModal"
    />

    <h2 class="text-xl font-bold">All Meditations</h2>
    <MeditationCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :is-favorite="favorites.includes(card.id)"
      @open-modal="openModal"
    />
  </div>
</template>

<script setup lang="ts">
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
