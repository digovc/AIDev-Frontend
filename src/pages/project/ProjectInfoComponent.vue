<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4">
    <h1 class="text-3xl font-bold mb-1">{{ project?.name }}</h1>
    <div class="text-gray-300 text-xs">
      Path: {{ project?.path }}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>
