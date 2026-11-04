<template>
  <img
    :src="isDark && 'srcDark' in art ? art.srcDark : art.src"
    :alt="alt ?? art.alt"
    class="size-full object-cover dark:brightness-[.72] dark:saturate-[.8]"
    :style="{ objectPosition: position ?? art.position }"
  />
</template>

<script setup lang="ts">
const { alt, position } = defineProps<{
  alt?: string;
  position?: string;
}>();

const { style } = useAppStyle();
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

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
  // Placeholder line drawing until the Figma art is ready.
  margin: {
    src: "/img/margin-desk.svg",
    srcDark: "/img/margin-desk-dark.svg",
    alt: "A desk lamp lighting an open notebook with a pen",
    position: "50% 72%",
  },
} as const;

const art = computed(() => ARTWORK[style.value]);
</script>
