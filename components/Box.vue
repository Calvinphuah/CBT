<template>
  <div :class="boxClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { outline, color, padding, shadow } = defineProps({
  outline: { type: Boolean, default: true },
  color: { type: String, default: "#d4d2c9" },
  padding: { type: String, default: "p-4" },
  shadow: { type: Boolean, default: false },
});

const boxClasses = computed(() => {
  return `
    rounded-lg
    ${padding}
    ${outline ? `border border-${color}` : ""}
    ${shadow ? "shadow-md" : ""}
  `.trim();
});
</script>

<style scoped></style>
