<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-6">
    <h1 class="text-3xl font-bold mb-4">{{ project?.name }}</h1>
    <p class="mb-6 text-lg">{{ project?.description }}</p>
    <div class="text-gray-300">
      <span class="font-semibold">Path:</span> {{ project?.path }}
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
</script>
