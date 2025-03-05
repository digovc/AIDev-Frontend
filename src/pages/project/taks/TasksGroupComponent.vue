<template>
  <div class="bg-gray-800 p-4 rounded-lg mb-4">
    <div @click="toggleExpanded" class="flex justify-between items-center cursor-pointer">
      <h3 class="text-xl font-semibold text-white flex items-center">
        {{ title }} <span class="ml-2 text-gray-400 text-sm">({{ tasks.length }})</span>
      </h3>
      <i :class="expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'" class="text-gray-400"></i>
    </div>

    <div v-if="expanded" class="mt-3">
      <div v-if="tasks.length === 0" class="text-gray-400 italic">
        Nenhuma tarefa {{ emptyMessage }}
      </div>
      <TaskComponent v-for="task in tasks" :key="task.id" :task="task" @play="$emit('play', $event)" @play-now="$emit('play-now', $event)" @stop="$emit('stop', $event)" @edit="$emit('edit', $event)" @archive="$emit('archive', $event)"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskComponent from './TaskComponent.vue';

const expanded = ref(true);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

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

defineEmits(['play', 'play-now', 'stop', 'edit', 'archive']);
</script>
