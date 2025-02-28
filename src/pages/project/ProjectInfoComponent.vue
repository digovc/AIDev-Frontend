<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-6">
    <h1 class="text-3xl font-bold mb-4">{{ project?.name }}</h1>
    <p class="mb-6 text-lg">{{ project?.description }}</p>
    <div class="text-gray-300">
      <span class="font-semibold">Path:</span> {{ project?.path }}
    </div>
    <div class="mt-8">
      <button @click="$emit('go-back')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Voltar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});

defineEmits(['go-back']);
</script>
