<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50 sm:bg-opacity-80"
  >
    <div
      class="relative flex flex-col items-center justify-between w-full h-screen py-8 bg-white md:py-6 md:h-auto md:max-w-lg md:rounded-lg"
    >
      <!-- Header -->
      <div class="flex items-center justify-between w-full px-6 py-4">
        <button class="p-2" @click="emit('toggleFavorite', meditation.id)">
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
          src="/videos/meditation-white.mp4"
          loop
          muted
          playsinline
          :controls="false"
          class="w-1/2 md:rounded-lg video-player"
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
          <button class="p-2 text-[#ACB8C2]" @click="rewind">
            <Icon name="f7:gobackward-15" class="w-8 h-8" />
          </button>
          <button
            class="flex items-center justify-center w-16 h-16 rounded-full bg-[#C1BDFC]"
            @click="togglePlay"
          >
            <Icon
              :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'"
              class="w-8 h-8 text-white"
            />
          </button>
          <button class="p-2 text-[#ACB8C2]" @click="forward">
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
  isFavorite: boolean;
}

const props = defineProps<MeditationProps>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "toggleFavorite", id: string): void;
}>();

// State for audio and video players
const audioPlayer = ref<HTMLAudioElement | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

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

function handleAudioEnd() {
  isPlaying.value = false;
  if (videoPlayer.value) {
    videoPlayer.value.pause();
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

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

// Lifecycle hooks
onMounted(() => {
  audioPlayer.value = new Audio(
    props.meditation.audioSrc || "/audio/breathing-meditation.mp3"
  );
  videoPlayer.value = document.querySelector("video");

  if (audioPlayer.value) {
    audioPlayer.value.addEventListener("loadedmetadata", setDuration);
    audioPlayer.value.addEventListener("timeupdate", updateTime);
    audioPlayer.value.addEventListener("ended", handleAudioEnd);
  }
});

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
    audioPlayer.value.removeEventListener("loadedmetadata", setDuration);
    audioPlayer.value.removeEventListener("timeupdate", updateTime);
    audioPlayer.value.removeEventListener("ended", handleAudioEnd);
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
/* Hide default video controls */
video::-webkit-media-controls {
  display: none !important;
}

video::-webkit-media-controls-enclosure {
  display: none !important;
}

video {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  pointer-events: none;
}

/* Custom range input styles */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  width: 100%;
  margin: 10px 0;
  position: relative;
  height: 16px;
  cursor: pointer;
}

/* Track styles */
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  cursor: pointer;
}

input[type="range"]::-moz-range-track {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  cursor: pointer;
}

/* Progress bar overlay */
input[type="range"]::before {
  content: "";
  position: absolute;
  background: #c1bdfc;
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
  background: #c1bdfc;
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
  background: #c1bdfc;
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
  background: #d1d5db;
}

input[type="range"]:hover::-moz-range-track {
  background: #d1d5db;
}

.video-player {
  /* Remove all default controls */
  -webkit-media-controls-panel: none !important;
  -webkit-media-controls: none !important;
  -webkit-media-controls-overlay-play-button: none !important;
  -webkit-media-controls-start-playback-button: none !important;
  -webkit-media-controls-play-button: none !important;
  -webkit-media-controls-timeline: none !important;
  -webkit-media-controls-current-time-display: none !important;
  -webkit-media-controls-time-remaining-display: none !important;
  -webkit-media-controls-time-control-container: none !important;
  -webkit-media-controls-toggle-closed-captions-button: none !important;
  -webkit-media-controls-volume-control-container: none !important;
  -webkit-media-controls-fullscreen-button: none !important;
  -webkit-media-controls-rewind-button: none !important;
  -webkit-media-controls-return-to-realtime-button: none !important;
  -webkit-media-controls-seek-back-button: none !important;
  -webkit-media-controls-seek-forward-button: none !important;
  -webkit-media-controls-mute-button: none !important;
  -webkit-media-controls-volume-slider: none !important;

  /* Prevent all interactions */
  pointer-events: none !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;

  /* Remove tap highlight on mobile */
  -webkit-tap-highlight-color: transparent !important;

  /* Ensure video doesn't show default play button */
  object-fit: contain;
  background: transparent;
}

/* Ensure video wrapper also prevents interactions */
.video-player-wrapper {
  pointer-events: none !important;
}
</style>
