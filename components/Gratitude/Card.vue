<template>
  <div class="w-full mx-auto">
    <div
      class="w-full p-4 transition-shadow bg-white border border-black rounded-lg hover:shadow-md"
      @click="$emit('click')"
    >
      <div class="flex items-center gap-4">
        <!-- image or Image (if provided) -->
        <div v-if="image" class="flex-shrink-0 w-16 h-16">
          <img
            :src="image"
            :alt="imageAlt || 'Gratitude icon'"
            class="object-contain w-full h-full"
          />
        </div>

        <!-- Content -->
        <p class="flex-grow text-base text-gray-800">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
interface Props {
  content: string;
  image?: string;
  imageAlt?: string;
}

defineProps<Props>();

// Emits
defineEmits<{
  click: [];
}>();
</script>

<style scoped>
/* Adjust border radius and padding to match the image */
.div {
  border-radius: 12px;
  padding: 16px;
}
</style>
