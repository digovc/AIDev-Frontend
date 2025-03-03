<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</h2>
      <button @click="goBack" class="text-gray-500 hover:text-gray-700">
        <span class="text-2xl">&times;</span>
      </button>
    </div>

    <form @submit.prevent="saveTask">
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <input type="text" id="title" v-model="task.title" class="form-input" required/>
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descrição</label>
        <at-ta :members="descriptionOptions">
          <textarea id="description" v-model="task.description" rows="15" class="form-input"></textarea>
        </at-ta>
      </div>

      <div class="mb-6 pointer-events-none opacity-50">
        <label for="status" class="form-label">Status</label>
        <select id="status" v-model="task.status" class="form-input">
          <option value="backlog">Backlog</option>
          <option value="running">Em Andamento</option>
          <option value="done">Concluído</option>
        </select>
      </div>

      <div class="flex justify-end space-x-3">
        <button type="button" @click="goBack" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { tasksApi } from '@/api/tasks.api';
import AtTa from 'vue-at/dist/vue-at-textarea'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const descriptionOptions = [
  'Tarefa 1',
  'Tarefa 2',
];

const router = useRouter();
const route = useRoute();
const loading = ref(false);

const isEditing = ref(false);

const task = reactive({
  id: null,
  title: '',
  description: '',
  status: 'backlog'
});

const goBack = () => {
  router.push(`/project/${ props.project.id }`);
};

const saveTask = async () => {
  try {
    loading.value = true;
    const taskData = {
      ...task,
      projectId: props.project.id
    };

    if (isEditing.value) {
      await tasksApi.updateTask(task.id, taskData);
    } else {
      await tasksApi.createTask(taskData);
    }

    // Navegar de volta para a lista de tarefas
    await router.push(`/project/${ props.project.id }`);
  } catch (error) {
    console.error(`Erro ao ${ isEditing.value ? 'atualizar' : 'salvar' } tarefa:`, error);
    alert(`Ocorreu um erro ao ${ isEditing.value ? 'atualizar' : 'salvar' } a tarefa. Por favor, tente novamente.`);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const taskId = route.params.taskId;
  if (taskId) {
    isEditing.value = true;
    try {
      loading.value = true;
      const response = await tasksApi.getTaskById(taskId);
      const taskData = response.data;
      task.id = taskData.id;
      task.title = taskData.title;
      task.description = taskData.description;
      task.status = taskData.status;
    } catch (error) {
      console.error('Erro ao carregar tarefa:', error);
      alert('Não foi possível carregar os dados da tarefa.');
      router.push(`/project/${ props.project.id }`);
    } finally {
      loading.value = false;
    }
  }
});
</script>

<style scoped></style>
