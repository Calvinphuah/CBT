<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 sm:bg-opacity-80"
  >
    <div
      class="relative flex flex-col items-center justify-between w-full h-screen py-8 text-white bg-black md:py-6 md:h-auto md:max-w-lg md:rounded-lg"
    >
      <!-- Header -->
      <div class="flex items-center justify-between w-full px-6 py-4">
        <button class="p-2" @click="toggleFavorite">
          <Icon
            :name="isFavorite ? 'heroicons:heart-solid' : 'heroicons:heart'"
            class="w-6 h-6"
          />
        </button>
        <div class="flex-1 text-center">
          <h2 class="text-xl font-semibold">{{ meditation.title }}</h2>
          <p class="text-sm text-gray-400">{{ meditation.time }}</p>
        </div>
        <button class="p-2" @click="emit('close')">
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <!-- Video Section -->
      <div class="flex items-center justify-center flex-1 py-8">
        <video
          ref="videoPlayer"
          src="/videos/meditation.mp4"
          loop
          muted
          class="w-1/2 md:rounded-lg"
        ></video>
      </div>

      <!-- Controls Section -->
      <div class="w-full px-6 py-6 space-y-4 md:rounded-b-lg">
        <!-- Progress Bar -->
        <div class="slider">
          <input
            v-model="currentTime"
            type="range"
            class="w-full level"
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
            <Icon name="f7:gobackward-15" class="w-8 h-8" />
          </button>
          <button
            class="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full"
            @click="togglePlay"
          >
            <Icon
              :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'"
              class="w-8 h-8"
            />
          </button>
          <button class="p-2" @click="forward">
            <Icon name="f7:goforward-15" class="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MeditationProps {
  isVisible: boolean;
  meditation: {
    id: string;
    title: string;
    time: string;
    description: string;
    audioSrc?: string;
  };
}

const props = defineProps<MeditationProps>();
const emit = defineEmits(["close"]);

// State for audio and video players
const audioPlayer = ref<HTMLAudioElement | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isFavorite = ref(false);

// Audio and Video Control Methods
function togglePlay() {
  if (audioPlayer.value && videoPlayer.value) {
    if (audioPlayer.value.paused) {
      audioPlayer.value.play();
      videoPlayer.value.play();
      isPlaying.value = true;
    } else {
      audioPlayer.value.pause();
      videoPlayer.value.pause();
      isPlaying.value = false;
    }
  }
}

function updateTime() {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime;
  }
}

function setDuration() {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration;
  }
}

function seekAudio() {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = currentTime.value;
  }
}

function rewind() {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = Math.max(
      0,
      audioPlayer.value.currentTime - 15
    );
    currentTime.value = audioPlayer.value.currentTime;
  }
}

function forward() {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = Math.min(
      duration.value,
      audioPlayer.value.currentTime + 15
    );
    currentTime.value = audioPlayer.value.currentTime;
  }
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

function toggleFavorite() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favoriteIndex = favorites.indexOf(props.meditation.id);

  if (favoriteIndex !== -1) {
    favorites.splice(favoriteIndex, 1);
    isFavorite.value = false;
  } else {
    favorites.push(props.meditation.id);
    isFavorite.value = true;
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Lifecycle hooks
onMounted(() => {
  audioPlayer.value = new Audio(
    props.meditation.audioSrc || "/audio/breathing-meditation.mp3"
  );
  videoPlayer.value = document.querySelector("video");

  audioPlayer.value.addEventListener("loadedmetadata", setDuration);
  audioPlayer.value.addEventListener("timeupdate", updateTime);

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  isFavorite.value = favorites.includes(props.meditation.id);
});

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.removeEventListener("loadedmetadata", setDuration);
    audioPlayer.value.removeEventListener("timeupdate", updateTime);
  }

  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
});

// Watch for modal visibility changes
watch(
  () => props.isVisible,
  (newValue) => {
    if (!newValue) {
      if (audioPlayer.value) {
        audioPlayer.value.pause();
      }
      if (videoPlayer.value) {
        videoPlayer.value.pause();
      }
      isPlaying.value = false;
    }
  }
);
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
  height: 16px; /* Increased height for better touch targets */
  cursor: pointer;
}

/* Track styles */
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2); /* Slightly visible background */
  border-radius: 2px;
  cursor: pointer;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
}

/* Progress bar overlay */
input[type="range"]::before {
  content: "";
  position: absolute;
  background: white;
  width: var(--progress-value, 0%);
  height: 4px;
  border-radius: 2px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
}

/* Thumb styles */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 12px;
  width: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -4px;
  position: relative;
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

input[type="range"]::-moz-range-thumb {
  height: 12px;
  width: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

/* Hover state */
input[type="range"]:hover::-webkit-slider-thumb {
  transform: scale(1.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

input[type="range"]:hover::-moz-range-thumb {
  transform: scale(1.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Active state */
input[type="range"]:active::-webkit-slider-thumb {
  transform: scale(1.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

input[type="range"]:active::-moz-range-thumb {
  transform: scale(1.1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

/* Focus state */
input[type="range"]:focus {
  outline: none;
}

/* Change the color when hovering */
input[type="range"]:hover::-webkit-slider-runnable-track {
  background: rgba(255, 255, 255, 0.3);
}

input[type="range"]:hover::-moz-range-track {
  background: rgba(255, 255, 255, 0.3);
}
</style>
