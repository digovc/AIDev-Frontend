<template>
  <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ project.name }}</h2>
    <p class="text-gray-600 mb-4">{{ project.description }}</p>
    <div class="text-sm text-gray-500">
      <span class="font-medium">Path:</span> {{ project.path }}
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
