<template>
  <div
    class="mx-3 h-[42vh] max-h-[360px] overflow-hidden rounded-[30px] md:m-4 md:h-auto md:max-h-none"
    :style="{ marginTop: 'max(0.75rem, env(safe-area-inset-top))' }"
  >
    <CommonIllustration :position="style === 'clearing' ? '50% 30%' : undefined" />
  </div>
</template>

<script setup lang="ts">
const { style } = useAppStyle();
</script>
