<template>
  <div>
    <button @click="store.nextStep">Increase Step</button>
    <button @click="store.previousStep">Decrease Step</button>
    <!-- {{ store.formData }} -->
    <CBTActivatingStep v-if="store.currentStep === 0" />
    <CBTBeliefsStep v-if="store.currentStep === 1" />
    <CBTConsequentFeelingsStep v-if="store.currentStep === 2" />
    <CBTDisputeStep v-if="store.currentStep === 3" />
  </div>
</template>

<script setup>
const store = useCBTStore();
</script>

<style lang="scss" scoped></style>
