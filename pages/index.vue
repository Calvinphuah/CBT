<template>
  <div>
    <p v-if="user">Logged in as: {{ user.email }}</p>
    {{ user?.displayName }}
    <input v-model="name" type="text" />
    <button @click="handleSubmit">Submit</button>
    <div v-if="dataStore.data.length === 0">Loading data...</div>
    <div v-else>
      <div v-for="data in dataStore.data" :key="data.id">
        {{ data }}
        <button @click="() => handleDelete(data.id)">Delete</button>
      </div>
    </div>
    hi
    {{ emails }}
  </div>
</template>

<script setup lang="ts">
const dataStore = useDataStore();
const { user } = useAuthStore();
const name = ref("");

onMounted(async () => {
  await dataStore.fetchAllData();
});

async function handleSubmit() {
  const data = {
    name: name.value,
    age: 30,
  };
  await dataStore.addData(data);
}

async function handleDelete(id) {
  await dataStore.deleteData(id);
}

const emails = computed(() => dataStore.onlyEmails);

definePageMeta({
  middleware: ["guest"],
});
</script>
