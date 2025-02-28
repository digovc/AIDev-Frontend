<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Tarefas</h2>
      <button @click="showTaskForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Nova Tarefa
      </button>
    </div>

    <div class="space-y-4">
      <!-- Grupos de tarefas -->
      <TasksGroupComponent title="Backlog" :tasks="getTasksByStatus('backlog')" emptyMessage="no backlog" @play="handlePlay" @play-now="handlePlayNow" @stop="handleStop" @edit="handleEdit"/>
      <TasksGroupComponent title="Em Andamento" :tasks="getTasksByStatus('running')" emptyMessage="em andamento" @play="handlePlay" @play-now="handlePlayNow" @stop="handleStop" @edit="handleEdit"/>
      <TasksGroupComponent title="Concluído" :tasks="getTasksByStatus('done')" emptyMessage="concluída" @play="handlePlay" @play-now="handlePlayNow" @stop="handleStop" @edit="handleEdit"/>
    </div>

    <TaskFormComponent ref="taskFormRef" @task-created="onTaskCreated" @task-updated="onTaskUpdated" :project="project"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import TaskFormComponent from './TaskFormComponent.vue';
import TasksGroupComponent from './TasksGroupComponent.vue';
// Adicione a importação da API de tarefas (ajuste o caminho conforme necessário)
import { tasksApi } from '@/api/tasks.api';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

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

const handlePlay = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = 'running';
  }
};

const handlePlayNow = (taskId) => {
  // Primeiro, coloca todas as tarefas em andamento de volta para o backlog
  tasks.value.forEach(t => {
    if (t.status === 'running') {
      t.status = 'backlog';
    }
  });

  // Depois, coloca a tarefa selecionada em andamento
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = 'running';
  }
};

const handleStop = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.status = 'done';
  }
};

const handleEdit = (task) => {
  taskFormRef.value.openForEdit(task);
};

const onTaskUpdated = (updatedTask) => {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
};

const loadTasks = async () => {
  try {
    const response = await tasksApi.getTasksByProject(props.project.id);
    tasks.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
};

onMounted(() => {
  loadTasks();
});
</script>
