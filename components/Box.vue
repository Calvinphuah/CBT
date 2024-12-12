<template>
  <div :class="boxClasses" :style="{ backgroundColor, width }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { outline, color, padding, shadow, backgroundColor, width } = defineProps(
  {
    outline: { type: Boolean, default: true },
    color: { type: String, default: "#d4d2c9" },
    padding: { type: String, default: "p-6" }, // More padding by default
    shadow: { type: Boolean, default: true }, // Enable shadow by default
    backgroundColor: { type: String, default: "#f5f4ef" }, // Light background color
    width: { type: String, default: "300px" }, // Minimum width
  }
);

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
