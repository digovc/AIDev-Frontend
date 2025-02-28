<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Tarefas</h2>
      <button @click="showTaskForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Nova Tarefa
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 grow">
      <!-- Coluna Backlog -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3 text-white">Backlog</h3>
        <div v-if="getTasksByStatus('backlog').length === 0" class="text-gray-400 italic">
          Nenhuma tarefa no backlog
        </div>
        <div v-for="task in getTasksByStatus('backlog')" :key="task.id" class="bg-gray-700 p-3 rounded mb-2">
          <h4 class="font-bold">{{ task.title }}</h4>
          <p class="text-sm text-gray-300">{{ task.description }}</p>
        </div>
      </div>

      <!-- Coluna Em Andamento -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3 text-white">Em Andamento</h3>
        <div v-if="getTasksByStatus('running').length === 0" class="text-gray-400 italic">
          Nenhuma tarefa em andamento
        </div>
        <div v-for="task in getTasksByStatus('running')" :key="task.id" class="bg-gray-700 p-3 rounded mb-2">
          <h4 class="font-bold">{{ task.title }}</h4>
          <p class="text-sm text-gray-300">{{ task.description }}</p>
        </div>
      </div>

      <!-- Coluna Concluído -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3 text-white">Concluído</h3>
        <div v-if="getTasksByStatus('done').length === 0" class="text-gray-400 italic">
          Nenhuma tarefa concluída
        </div>
        <div v-for="task in getTasksByStatus('done')" :key="task.id" class="bg-gray-700 p-3 rounded mb-2">
          <h4 class="font-bold">{{ task.title }}</h4>
          <p class="text-sm text-gray-300">{{ task.description }}</p>
        </div>
      </div>
    </div>

    <TaskFormComponent ref="taskFormRef" @task-created="onTaskCreated"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskFormComponent from './TaskFormComponent.vue';

const tasks = ref([]);
const taskFormRef = ref(null);

const showTaskForm = () => {
  taskFormRef.value.open();
};

const onTaskCreated = (newTask) => {
  tasks.value.push(newTask);
};

const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status);
};
</script>
