<template>
  <div :class="boxClasses" :style="{ backgroundColor, width }">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  outline?: boolean;
  color?: string;
  padding?: string;
  shadow?: boolean;
  backgroundColor?: string;
  width?: string;
}

const props = defineProps<Props>();

const {
  outline = true,
  color = "#d4d2c9",
  padding = "p-6",
  shadow = true,
  backgroundColor = "#f5f4ef",
  width = "300px",
} = props;

const boxClasses = computed(() => {
  return `
    rounded-lg
    ${padding}
    ${outline ? `border border-[${color}]` : ""}
    ${shadow ? "shadow-xl" : ""}
  `.trim();
});
</script>

<style scoped></style>
