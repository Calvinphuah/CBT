<template>
  <!-- Modal Backdrop -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 sm:bg-opacity-80"
  >
    <!-- Modal Content -->
    <div
      class="relative w-full h-full text-white bg-black sm:h-auto sm:max-w-lg sm:rounded-lg"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6">
        <button class="p-2" @click="closeModal">
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
        <div class="text-center">
          <h2 class="text-xl font-semibold">{{ meditation.title }}</h2>
          <p class="text-sm text-gray-400">{{ meditation.time }}</p>
        </div>
        <button class="p-2">
          <Icon name="heroicons:heart" class="w-6 h-6" />
        </button>
      </div>

      <!-- Placeholder Image -->
      <div class="flex justify-center my-6">
        <img
          src="https://via.placeholder.com/300"
          alt="Placeholder"
          class="w-48 h-48 rounded-full"
        />
      </div>

      <!-- Audio Controls -->
      <div class="px-6 pb-6 space-y-6">
        <!-- Progress Bar -->
        <div class="slider">
          <input
            v-model="currentTime"
            type="range"
            class="level"
            min="0"
            :max="duration"
            step="0.1"
            @input="seekAudio"
          />
          <div class="flex justify-between mt-2 text-xs text-gray-400">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Playback Controls -->
        <div class="flex items-center justify-center space-x-8">
          <button class="p-2" @click="rewind">
            <Icon name="heroicons:arrow-uturn-left" class="w-8 h-8" />
          </button>
          <button class="p-4 bg-gray-700 rounded-full" @click="togglePlay">
            <Icon
              :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'"
              class="w-8 h-8"
            />
          </button>
          <button class="p-2" @click="forward">
            <Icon name="heroicons:arrow-uturn-right" class="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Props for modal content
const meditation = {
  title: "Breathing Meditation",
  time: "5 mins",
  audioSrc: "/audio/breathing-meditation.mp3",
};

// State for audio player
const audioPlayer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// Close Modal Function (Stub)
function closeModal() {
  console.log("Modal Closed");
}

// Audio Control Methods
function togglePlay() {
  if (audioPlayer.value.paused) {
    audioPlayer.value.play();
    isPlaying.value = true;
  } else {
    audioPlayer.value.pause();
    isPlaying.value = false;
  }
}

function updateTime() {
  currentTime.value = audioPlayer.value.currentTime;
}

function setDuration() {
  duration.value = audioPlayer.value.duration;
}

function seekAudio() {
  audioPlayer.value.currentTime = currentTime.value;
}

function rewind() {
  audioPlayer.value.currentTime = Math.max(
    0,
    audioPlayer.value.currentTime - 15
  );
  currentTime.value = audioPlayer.value.currentTime;
}

function forward() {
  audioPlayer.value.currentTime = Math.min(
    duration.value,
    audioPlayer.value.currentTime + 15
  );
  currentTime.value = audioPlayer.value.currentTime;
}

// Format Time (MM:SS)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

// Set up audio player
onMounted(() => {
  audioPlayer.value = new Audio(meditation.audioSrc);
  audioPlayer.value.addEventListener("loadedmetadata", setDuration);
  audioPlayer.value.addEventListener("timeupdate", updateTime);
});

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.removeEventListener("loadedmetadata", setDuration);
    audioPlayer.value.removeEventListener("timeupdate", updateTime);
  }
});
</script>

<style scoped>
/* Custom range input styles */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  width: 100%;
  margin: 10px 0;
  position: relative;
}

/* Track styles */
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: rgb(82, 82, 82);
  border-radius: 2px;
  cursor: pointer;
  background: linear-gradient(
    to right,
    white 0%,
    white var(--progress-value, 0%),
    rgb(82, 82, 82) var(--progress-value, 0%),
    rgb(82, 82, 82) 100%
  );
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  cursor: pointer;
  background: linear-gradient(
    to right,
    white 0%,
    white var(--progress-value, 0%),
    rgb(82, 82, 82) var(--progress-value, 0%),
    rgb(82, 82, 82) 100%
  );
}

/* Thumb styles */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  margin-top: -4px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  z-index: 1;
}

input[type="range"]::-moz-range-thumb {
  height: 12px;
  width: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  z-index: 1;
}

/* Active state */
input[type="range"]:active::-webkit-slider-thumb {
  transform: scale(1.2);
}

input[type="range"]:active::-moz-range-thumb {
  transform: scale(1.2);
}

/* Focus state */
input[type="range"]:focus {
  outline: none;
}
</style>
