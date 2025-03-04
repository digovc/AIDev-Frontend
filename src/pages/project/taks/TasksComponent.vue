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

  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import TasksGroupComponent from './TasksGroupComponent.vue';
import { tasksApi } from '@/api/tasks.api.js';
import { socketIOService } from "@/services/socket.io.js";

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const emit = defineEmits(['taskSelected']);
const tasks = ref([]);

const showTaskForm = () => {
  router.push(`/project/${ props.project.id }/tasks/new`);
};

const getTasksByStatus = (status) => {
  return tasks.value.filter(task => task.status === status);
};

const handlePlay = async (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (!task) return;
  task.status = 'running';

  try {
    await tasksApi.runTask(task.id);
    emit('taskSelected', task);
  } catch (error) {
    task.status = 'backlog';
    alert('Erro ao iniciar tarefa: ' + error.message);
  }
};

const handlePlayNow = (taskId) => {
  // Primeiro, coloca todas as tarefas em andamento de volta para o backlog
  tasks.value.forEach(t => {
    if (t.status === 'running') {
      t.status = 'backlog';
    }
  });

  const task = tasks.value.find(t => t.id === taskId);

  if (task) {
    task.status = 'running';
    emit('taskSelected', task);
  }
};

const handleStop = async (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);

  if (!task) {
    return;
  }

  task.status = 'backlog';
  await tasksApi.stopTask(task.id);
};

const handleEdit = (task) => {
  router.push(`/project/${ props.project.id }/tasks/${ task.id }`);
  emit('taskSelected', task);
};

const loadTasks = async () => {
  const result = await tasksApi.getTasksByProjectId(props.project.id);
  tasks.value = result.data;
};

const taskExecuting = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.isExecuting = true;
  }
};

const taskNotExecuting = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId);
  if (task) {
    task.isExecuting = false
  }
};

onMounted(async () => {
  await loadTasks()
  socketIOService.socket.on('task-executing', taskExecuting);
  socketIOService.socket.on('task-not-executing', taskNotExecuting);
});

onUnmounted(() => {
  socketIOService.socket.off('task-executing', taskExecuting);
  socketIOService.socket.off('task-not-executing', taskNotExecuting);
});
</script>
