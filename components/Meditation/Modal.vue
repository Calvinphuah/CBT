<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[300] flex items-stretch justify-center bg-black/45 md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
      :aria-label="meditation.title"
    >
      <div
        class="flex w-full flex-col gap-5 overflow-y-auto bg-page px-5 text-ink md:max-w-md md:rounded-sheet md:px-7 md:pb-7"
        :style="{
          paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }"
      >
        <!-- Header -->
        <div class="flex h-11 items-center justify-between">
          <button type="button" class="icon-btn -ml-2.5" aria-label="Close player" @click="emit('close')">
            <ChevronDownIcon class="size-6" aria-hidden="true" />
          </button>
          <span class="text-[15px] font-semibold text-ink-2">Now playing</span>
          <button
            type="button"
            class="icon-btn -mr-2.5"
            :aria-label="isFavorite ? 'Remove from favourites' : 'Add to favourites'"
            :aria-pressed="isFavorite"
            @click="emit('toggleFavorite', meditation.id)"
          >
            <HeartSolidIcon v-if="isFavorite" class="size-6 text-danger" aria-hidden="true" />
            <HeartIcon v-else class="size-6" aria-hidden="true" />
          </button>
        </div>

        <div class="h-[min(36vh,340px)] w-full shrink-0 overflow-hidden rounded-[28px]">
          <CommonIllustration alt="" :position="style === 'clearing' ? '50% 45%' : undefined" />
        </div>

        <div>
          <h2 class="text-title">{{ meditation.title }}</h2>
          <p class="mt-1 text-[15px] text-ink-3">
            UCLA Mindful, {{ meditation.time.replace("mins", "min") }}
          </p>
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
            :style="{ '--progress-value': progressPercent }"
            @input="seekAudio"
          />
          <div class="mt-1 flex justify-between text-[13px] font-semibold tabular-nums text-ink-3">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Playback Controls -->
        <div class="flex items-center justify-center gap-9 pb-2">
          <button type="button" class="icon-btn size-12" aria-label="Back 15 seconds" @click="rewind">
            <Icon name="f7:gobackward-15" class="size-8" />
          </button>
          <button
            type="button"
            class="icon-btn-filled size-[76px]"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            @click="togglePlay"
          >
            <PauseIcon v-if="isPlaying" class="size-8" aria-hidden="true" />
            <PlayIcon v-else class="size-8" aria-hidden="true" />
          </button>
          <button type="button" class="icon-btn size-12" aria-label="Forward 15 seconds" @click="forward">
            <Icon name="f7:goforward-15" class="size-8" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ChevronDownIcon, HeartIcon } from "@heroicons/vue/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/vue/24/solid";

const { style } = useAppStyle();

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

// Audio player state
const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const progressPercent = computed(() =>
  duration.value ? `${(currentTime.value / duration.value) * 100}%` : "0%"
);

// Audio control methods
function togglePlay() {
  if (audioPlayer.value) {
    if (audioPlayer.value.paused) {
      audioPlayer.value.play();
      isPlaying.value = true;
    } else {
      audioPlayer.value.pause();
      isPlaying.value = false;
    }
  }
}

function handleAudioEnd() {
  isPlaying.value = false;
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

});

// Keep the page behind still while the player is open.
const isBodyLocked = useScrollLock(import.meta.client ? document.body : null);
onBeforeUnmount(() => {
  isBodyLocked.value = false;
});

// Watch for modal visibility changes
watch(
  () => props.isVisible,
  (newValue) => {
    isBodyLocked.value = newValue;
    if (!newValue) {
      if (audioPlayer.value) {
        audioPlayer.value.pause();
      }
      isPlaying.value = false;
    }
  },
  { immediate: true }
);
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
