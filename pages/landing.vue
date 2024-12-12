<template>
  <div>{{ user }}</div>
</template>

<script setup lang="ts">
const { user } = useAuth();
</script>

<style scoped></style>
