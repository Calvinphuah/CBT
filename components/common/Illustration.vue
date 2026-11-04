<template>
  <img
    :src="isDark && art.srcDark ? art.srcDark : art.src"
    :alt="alt ?? art.alt"
    class="size-full object-cover dark:brightness-[.72] dark:saturate-[.8]"
    :style="{ objectPosition: position ?? art.position, scale: art.scale }"
  />
</template>

<script setup lang="ts">
type Variant = "hero" | "banner" | "night" | "player" | "saved" | "wave";

interface Art {
  src: string;
  srcDark?: string;
  alt: string;
  position: string;
  scale?: string;
}

const {
  alt,
  position,
  variant = "hero",
} = defineProps<{
  alt?: string;
  position?: string;
  variant?: Variant;
}>();

const { style } = useAppStyle();
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

// Each style has a main picture; the other moments fall back to it when a style has no art for them.
const ARTWORK: Record<AppStyle, Partial<Record<Variant, Art>> & { hero: Art }> = {
  clearing: {
    hero: {
      src: "/img/clearing-hero.jpg",
      alt: "Storm clouds parting to reveal the sun over a hill",
      position: "50% 55%",
    },
    banner: {
      src: "/img/clearing-wide.webp",
      alt: "Storm clouds parting around the sun above a figure on a hill",
      position: "50% 50%",
    },
    night: {
      src: "/img/clearing-rest.webp",
      alt: "A figure sitting on a hill under a crescent moon at dusk",
      position: "50% 55%",
    },
    player: {
      src: "/img/clearing-rest.webp",
      alt: "A figure sitting on a hill under a crescent moon at dusk",
      position: "50% 55%",
    },
    saved: {
      src: "/img/clearing-saved.webp",
      alt: "A clear sky and risen sun over a figure with arms raised",
      position: "50% 50%",
    },
  },
  workbook: {
    hero: {
      src: "/img/workbook-knot.jpg",
      alt: "A tangled pencil scribble unwinding into a calm blue line",
      position: "50% 50%",
    },
    banner: {
      src: "/img/workbook-wide.webp",
      alt: "A tangled pencil scribble unwinding into a calm blue line",
      position: "50% 50%",
    },
    night: {
      src: "/img/workbook-wide.webp",
      alt: "A tangled pencil scribble unwinding into a calm blue line",
      position: "50% 50%",
    },
    saved: {
      src: "/img/workbook-saved.webp",
      alt: "A relaxed blue line ending in a tick",
      position: "50% 50%",
      // The tick is small on a big sheet, so zoom in on it.
      scale: "1.8",
    },
  },
  companion: {
    hero: {
      src: "/img/companion-mascot.jpg",
      alt: "Cog, a small lilac character holding a glowing lightbulb",
      position: "50% 50%",
    },
    banner: {
      src: "/img/companion-rest.webp",
      alt: "Cog asleep on a cloud cushion under a crescent moon",
      position: "50% 50%",
    },
    night: {
      src: "/img/companion-rest.webp",
      alt: "Cog asleep on a cloud cushion under a crescent moon",
      position: "50% 50%",
    },
    player: {
      src: "/img/companion-rest.webp",
      alt: "Cog asleep on a cloud cushion under a crescent moon",
      position: "50% 50%",
    },
    saved: {
      src: "/img/companion-saved.webp",
      alt: "Cog cheering with both arms up",
      position: "50% 50%",
    },
    wave: {
      src: "/img/companion-wave.webp",
      alt: "Cog waving hello",
      position: "50% 50%",
    },
  },
  // Placeholder line drawing until the Figma art is ready.
  margin: {
    hero: {
      src: "/img/margin-desk.svg",
      srcDark: "/img/margin-desk-dark.svg",
      alt: "A desk lamp lighting an open notebook with a pen",
      position: "50% 72%",
    },
  },
};

const art = computed(() => {
  const set = ARTWORK[style.value];
  return set[variant] ?? set.hero;
});
</script>
