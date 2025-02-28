<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
    <h2 class="text-xl font-semibold mb-2">{{ project.name }}</h2>
    <p class="mb-4 text-sm">{{ project.description }}</p>
    <div class="text-sm text-gray-300 text-xs">
      <span>Path:</span> {{ project.path }}
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
