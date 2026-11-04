<template>
  <div
    class="mx-auto flex min-h-[100dvh] max-w-md flex-col gap-5 bg-page px-5 text-ink"
    :style="{
      paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
      paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
    }"
  >
    <!-- Header -->
    <div class="flex h-11 items-center justify-between">
      <button type="button" class="icon-btn -ml-2.5" aria-label="Close" @click="goBack">
        <Icon name="heroicons:x-mark" class="size-6" />
      </button>
      <span class="text-[15px] font-semibold text-ink-2">Now playing</span>
      <span class="size-11" aria-hidden="true" />
    </div>

    <div class="art-frame h-[min(36vh,340px)] w-full shrink-0 overflow-hidden rounded-[28px]">
      <CommonIllustration alt="" :position="style === 'clearing' ? '50% 45%' : undefined" />
    </div>

    <div>
      <h1 class="text-title">{{ meditation?.title }}</h1>
      <p class="mt-1 text-[15px] text-ink-3">{{ meditation?.description }}</p>
    </div>

    <!-- Progress Bar -->
    <div>
      <label for="meditation-progress" class="sr-only">Playback position</label>
      <input
        id="meditation-progress"
        v-model="currentTime"
        type="range"
        class="w-full"
        min="0"
        :max="duration"
        step="0.1"
        :style="{ '--progress-value': duration ? `${(currentTime / duration) * 100}%` : '0%' }"
        @input="isSeeking = true"
        @change="seekAudio"
      />
      <div class="mt-1 flex justify-between text-[13px] font-semibold tabular-nums text-ink-3">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- Playback Controls -->
    <div class="flex items-center justify-center gap-9">
      <button type="button" class="icon-btn size-12" aria-label="Back 15 seconds" @click="rewind">
        <Icon name="f7:gobackward-15" class="size-8" />
      </button>
      <button
        type="button"
        class="icon-btn-filled size-[76px]"
        :aria-label="isPlaying ? 'Pause' : 'Play'"
        @click="togglePlay"
      >
        <Icon :name="isPlaying ? 'heroicons:pause-solid' : 'heroicons:play-solid'" class="size-8" />
      </button>
      <button type="button" class="icon-btn size-12" aria-label="Forward 15 seconds" @click="forward">
        <Icon name="f7:goforward-15" class="size-8" />
      </button>
    </div>
  </div>
</template>

<script setup>
// Dynamic Page Metadata
definePageMeta({
  layout: false,
});

// Router
const route = useRoute();
const { style } = useAppStyle();
const router = useRouter();

// Mock Data (Cards Array)
const cards = [
  {
    id: "breathing-meditation",
    title: "Breathing Meditation",
    description:
      "A meditation to help combat negative thoughts and ruminations.",
    time: "5 mins",
    audioSrc: "/audio/breathing-meditation.mp3",
  },
  {
    id: "breath-sound-body-meditation",
    title: "Breath, Sound, Body Meditation",
    description:
      "A guided meditation focusing on breath, sound, and body awareness.",
    time: "12 mins",
    audioSrc: "/audio/breath-sound-body-meditation.mp3",
  },
  {
    id: "complete-meditation-instructions",
    title: "Complete Meditation Instructions",
    description: "Comprehensive guidance for a complete meditation practice.",
    time: "19 mins",
    audioSrc: "/audio/complete-meditation-instructions.mp3",
  },
  {
    id: "working-with-difficulties",
    title: "Meditation for Working with Difficulties",
    description:
      "Learn techniques to navigate challenging emotions and situations.",
    time: "7 mins",
    audioSrc: "/audio/meditation-working-with-difficulties.mp3",
  },
  // Add other cards here
];

// Fetch Current Meditation by Route Param ID
const meditation = cards.find((card) => card.id === route.params.id) || {
  title: "Meditation Not Found",
  description: "Unable to find the requested meditation.",
  time: "",
  audioSrc: "",
};

// Navigation
function goBack() {
  router.push("/");
}

// Audio Player State
const audioPlayer = ref(null);
const waveformCanvas = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

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

// While the slider is being dragged, playback ticks must not move it back.
const isSeeking = ref(false);

function updateTime() {
  if (!isSeeking.value) currentTime.value = audioPlayer.value.currentTime;
}

function setDuration() {
  duration.value = audioPlayer.value.duration;
}

function seekAudio() {
  audioPlayer.value.currentTime = Number(currentTime.value);
  isSeeking.value = false;
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

// Load Audio
onMounted(() => {
  audioPlayer.value = new Audio(meditation.audioSrc);
  audioPlayer.value.addEventListener("loadedmetadata", setDuration);
  audioPlayer.value.addEventListener("timeupdate", updateTime);

  drawWaveform();
});

// Waveform Visualization
function drawWaveform() {
  if (!waveformCanvas.value) return;

  const ctx = waveformCanvas.value.getContext("2d");
  const width = waveformCanvas.value.width;
  const height = waveformCanvas.value.height;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.strokeStyle = "#0ea5e9";
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
</script>

<style scoped>
/* Range input themed with the app tokens; the filled part follows --progress-value. */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  height: 20px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    rgb(var(--c-btn)) 0%,
    rgb(var(--c-btn)) var(--progress-value, 0%),
    rgb(var(--c-rule)) var(--progress-value, 0%),
    rgb(var(--c-rule)) 100%
  );
}

input[type="range"]::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: rgb(var(--c-rule));
}

input[type="range"]::-moz-range-progress {
  height: 4px;
  border-radius: 2px;
  background: rgb(var(--c-btn));
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  margin-top: -6px;
  border-radius: 50%;
  background: rgb(var(--c-btn));
}

input[type="range"]::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border: none;
  border-radius: 50%;
  background: rgb(var(--c-btn));
}
</style>
