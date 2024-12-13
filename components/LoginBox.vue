<template>
  <div>
    <Box
      ><InputBox
        id="email"
        v-model="email"
        label="Email"
        name="email"
        type="email"
        class="mb-6" />
      <InputBox
        id="password"
        v-model="password"
        label="Password"
        name="password"
        type="password"
    /></Box>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
</script>

<style scoped></style>
