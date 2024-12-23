<template>
  <div class="px-4 py-6">
    <!-- Header -->
    <div class="flex justify-between items-center py-4">
      <!-- Page Name -->
      <div>CBT</div>
      <!-- Buttons -->
      <div class="flex gap-2">
        <button class="btn">Save</button>
        <button class="btn">Save</button>
      </div>
    </div>

    <!-- CBT Form -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">A: Activating Event</h3>
        <textarea
          class="w-full mt-2 border rounded p-2"
          placeholder="Describe the activating event"
        ></textarea>
      </div>
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">B: Beliefs</h3>
        <textarea
          class="w-full mt-2 border rounded p-2"
          placeholder="What are your beliefs about this event?"
        ></textarea>
      </div>
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">C: Consequences</h3>
        <textarea
          class="w-full mt-2 border rounded p-2"
          placeholder="What are the consequences?"
        ></textarea>
      </div>
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">D: Disputation</h3>
        <textarea
          class="w-full mt-2 border rounded p-2"
          placeholder="How can you dispute these beliefs?"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthStore();

console.log("user", user);

// definePageMeta({
//   middleware: ["auth"],
// });
</script>
