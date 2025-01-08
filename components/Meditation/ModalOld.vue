<template>
  <div v-if="isOpen" class="fixed inset-0 z-50">
    <!-- Modal Backdrop -->
    <div class="absolute inset-0 bg-black"></div>

    <!-- Modal Content -->
    <div class="relative flex flex-col h-full text-white">
      <!-- Header -->
      <div class="flex items-center justify-between p-6">
        <button @click="$emit('close')" class="p-2">
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
        <div class="text-center">
          <h2 class="text-xl font-semibold">{{ meditation.title }}</h2>
          <p class="text-sm text-gray-400">Single</p>
        </div>
        <button class="p-2">
          <Icon name="heroicons:heart" class="w-6 h-6" />
        </button>
      </div>

      <!-- Waveform Visualization -->
      <div class="flex items-center justify-center flex-1">
        <div class="relative w-full h-32">
          <canvas ref="waveformCanvas" class="absolute inset-0"></canvas>
        </div>
      </div>

      <!-- Audio Controls -->
      <div class="px-6 pb-6 space-y-6">
        <!-- Progress Bar -->
        <div class="slider">
          <input
            type="range"
            class="level"
            min="0"
            :max="duration"
            step="0.1"
            v-model="currentTime"
            @input="seekAudio"
          />
          <div class="flex justify-between mt-2 text-xs text-gray-400">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Playback Controls -->
        <div class="flex items-center justify-center space-x-8">
          <button @click="rewind" class="p-2">
            <Icon name="heroicons:arrow-uturn-left" class="w-8 h-8" />
          </button>
          <button @click="togglePlay" class="p-4 bg-gray-700 rounded-full">
            <Icon
              :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'"
              class="w-8 h-8"
            />
          </button>
          <button @click="forward" class="p-2">
            <Icon name="heroicons:arrow-uturn-right" class="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden Audio Element -->
    <audio
      ref="audioPlayer"
      :src="meditation.audioSrc"
      @timeupdate="updateTime"
      @loadedmetadata="setDuration"
      @ended="handleEnded"
    ></audio>
  </div>
</template>

<script setup>
// Props and Emits
const { isOpen, meditation = {} } = defineProps({
  isOpen: Boolean,
  meditation: Object,
});
defineEmits(["close"]);

// Refs and State
const audioPlayer = ref(null);
const waveformCanvas = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// Audio Controls
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

function handleEnded() {
  isPlaying.value = false;
  currentTime.value = 0;
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

// Time Formatter
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

// Waveform Visualization
function drawWaveform() {
  if (!waveformCanvas.value) return;

  const ctx = waveformCanvas.value.getContext("2d");
  const width = waveformCanvas.value.width;
  const height = waveformCanvas.value.height;

  // Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // Draw Waveform
  ctx.beginPath();
  ctx.strokeStyle = "#0ea5e9"; // Cyan color
  ctx.lineWidth = 2;

  for (let x = 0; x < width; x++) {
    const y = height / 2 + Math.sin(x * 0.05) * 20;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

// Lifecycle Hooks
onMounted(() => {
  if (waveformCanvas.value) {
    waveformCanvas.value.width = waveformCanvas.value.offsetWidth;
    waveformCanvas.value.height = waveformCanvas.value.offsetHeight;
    drawWaveform();
  }
});

onBeforeUnmount(() => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
  }
});
</script>

<style scoped>
/* From Uiverse.io by Galahhad */
.slider {
  --slider-width: 100%;
  --slider-height: 6px;
  --slider-bg: rgb(82, 82, 82);
  --slider-border-radius: 999px;
  --level-color: #fff;
  --level-transition-duration: 0.1s;
  --icon-margin: 15px;
  --icon-color: var(--slider-bg);
  --icon-size: 25px;
}

.slider .level {
  appearance: none;
  -webkit-appearance: none;
  width: var(--slider-width);
  height: var(--slider-height);
  background: var(--slider-bg);
  border-radius: var(--slider-border-radius);
  cursor: pointer;
  overflow: hidden;
  transition: height var(--level-transition-duration);
}

.slider .level::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  height: 0;
  box-shadow: -200px 0 0 200px var(--level-color);
}

.slider:hover .level {
  height: calc(var(--slider-height) * 2);
}
</style>
