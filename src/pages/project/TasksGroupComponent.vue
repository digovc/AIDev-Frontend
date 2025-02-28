<template>
  <div class="bg-gray-800 p-4 rounded-lg">
    <h3 class="text-xl font-semibold mb-3 text-white">{{ title }}</h3>
    <div v-if="tasks.length === 0" class="text-gray-400 italic">
      Nenhuma tarefa {{ emptyMessage }}
    </div>
    <div v-for="task in tasks" :key="task.id" class="bg-gray-700 p-3 rounded mb-2">
      <h4 class="font-bold">{{ task.title }}</h4>
      <p class="text-sm text-gray-300">{{ task.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  },
  emptyMessage: {
    type: String,
    default: ''
  }
});
</script>
