<template>
  <img
    :src="art.src"
    :alt="alt ?? art.alt"
    class="size-full object-cover dark:brightness-[.85] dark:saturate-[.9]"
    :style="{ objectPosition: position ?? art.position }"
  />
</template>

<script setup lang="ts">
const { alt, position } = defineProps<{
  alt?: string;
  position?: string;
}>();

const { style } = useAppStyle();

// One picture per style, reused across screens by cropping.
const ARTWORK = {
  clearing: {
    src: "/img/clearing-hero.jpg",
    alt: "Storm clouds parting to reveal the sun over a hill",
    position: "50% 55%",
  },
  workbook: {
    src: "/img/workbook-knot.jpg",
    alt: "A tangled pencil scribble unwinding into a calm blue line",
    position: "50% 50%",
  },
  companion: {
    src: "/img/companion-mascot.jpg",
    alt: "Cog, a small lilac character holding a glowing lightbulb",
    position: "50% 50%",
  },
} as const;

const art = computed(() => ARTWORK[style.value]);
</script>
