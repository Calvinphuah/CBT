<template>
  <MeditationModal
    v-if="selectedMeditation"
    :is-visible="isModalVisible"
    :meditation="selectedMeditation"
    @close="closeModal"
  />
  <div class="max-w-lg p-4 mx-auto space-y-6">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="transition-transform transform bg-white border border-gray-200 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
    >
      <button
        class="flex items-center justify-between w-full p-4 text-left"
        @click="openModal(card)"
      >
        <!-- Text Section -->
        <div class="flex flex-col">
          <h3 class="text-lg font-semibold text-gray-800">{{ card.title }}</h3>
          <p class="text-sm text-gray-600">{{ card.description }}</p>
        </div>

        <!-- Time Section -->
        <div
          class="flex flex-col items-center justify-center ml-6 text-gray-500"
        >
          <span class="text-2xl font-bold text-gray-800">{{
            card.time.split(" ")[0]
          }}</span>
          <span class="text-sm">mins</span>
        </div>
      </button>
    </div>
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

function openModal(card: Card) {
  selectedMeditation.value = card;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  selectedMeditation.value = null;
}

const favorites = ref<string[]>([]);

console.log(cards);

onMounted(() => {
  // Initialize favorites from local storage
  favorites.value = JSON.parse(localStorage.getItem("favorites") || "[]");
});
</script>
