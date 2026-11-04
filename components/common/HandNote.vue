<template>
  <p
    v-if="style === 'workbook'"
    class="font-hand text-[22px] font-bold leading-6 text-pen"
    :style="{ transform: `rotate(${tilt}deg)` }"
  >
    <slot />
  </p>
</template>

<script setup lang="ts">
// A margin note in biro handwriting. Only the Workbook style shows it.
const { tilt = -2 } = defineProps<{ tilt?: number }>();

const { style } = useAppStyle();
</script>
