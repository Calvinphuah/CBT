<template>
  <div class="px-4 py-6">
    <!-- Header -->
    <div class="flex justify-between items-center py-4">
      <div>CBT</div>
      <div class="flex gap-2">
        <button class="btn" @click="handleSaveClick">Save</button>
      </div>
    </div>

    <!-- CBT Form -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">A: Activating Event</h3>
        <textarea
          v-model="activatingEvent"
          class="w-full mt-2 border rounded p-2"
          placeholder="Describe the activating event"
        ></textarea>
      </div>
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">B: Beliefs</h3>
        <textarea
          v-model="beliefs"
          class="w-full mt-2 border rounded p-2"
          placeholder="What are your beliefs about this event?"
        ></textarea>
      </div>
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">C: Consequent Feelings</h3>
        <textarea
          v-model="consequentFeelings"
          class="w-full mt-2 border rounded p-2"
          placeholder="What are the consequences?"
        ></textarea>
      </div>
      <div class="bg-white shadow rounded p-4">
        <h3 class="font-bold text-lg">D: Dispute Negative Thoughts</h3>
        <textarea
          v-model="disputes"
          class="w-full mt-2 border rounded p-2"
          placeholder="How can you dispute these beliefs?"
        ></textarea>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="cbtStore.error" class="mt-4 text-red-600">
      {{ cbtStore.error }}
    </div>

    <!-- Confirmation Modal -->
    <CommonModal
      :is-open="showConfirmationModal"
      :loading="cbtStore.loading"
      @confirm="saveData"
      @cancel="showConfirmationModal = false"
    />
  </div>
</template>

<script setup lang="ts">
const cbtStore = useCBTStore();

// Form Data
const activatingEvent = ref("");
const beliefs = ref("");
const consequentFeelings = ref("");
const disputes = ref("");

// Modal Flag
const showConfirmationModal = ref(false);

// Handle initial save button click
function handleSaveClick() {
  // Validation
  if (
    !activatingEvent.value ||
    !beliefs.value ||
    !consequentFeelings.value ||
    !disputes.value
  ) {
    alert("Please fill in all fields");
    return;
  }

  // Show confirmation modal
  showConfirmationModal.value = true;
}

// Handle actual save after confirmation
async function saveData() {
  try {
    await cbtStore.addEntry({
      activatingEvent: activatingEvent.value,
      beliefs: beliefs.value,
      consequentFeelings: consequentFeelings.value,
      disputes: disputes.value,
    });

    // Clear form after successful save
    activatingEvent.value = "";
    beliefs.value = "";
    consequentFeelings.value = "";
    disputes.value = "";

    // Close modal
    showConfirmationModal.value = false;
  } catch (error) {
    console.error("Error saving CBT entry:", error);
  }
}
</script>
