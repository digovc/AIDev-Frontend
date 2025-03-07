<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">{{ isEditing ? `Editar Tarefa (${ task.id })` : 'Nova Tarefa' }}</h2>
      <button @click="goBack" class="text-gray-500 hover:text-gray-700">
        <span class="text-2xl">&times;</span>
      </button>
    </div>

    <form @submit.prevent="saveTask">
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <input type="text" id="title" v-model="task.title" class="form-input" required autofocus/>
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descrição</label>
        <textarea id="description" v-model="task.description" rows="15" class="form-input"></textarea>
      </div>

      <!-- Adicione esta nova seção para listar as referências -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <label class="form-label">Referências</label>
          <button type="button" @click="openReferencesDialog" class="btn btn-secondary btn-sm">
            Adicionar Referência
          </button>
        </div>

        <div v-if="task.references.length === 0" class="text-gray-500 italic p-2">
          Nenhuma referência adicionada
        </div>

        <div v-else class="space-y-2 max-h-60 overflow-y-auto pt-3 pr-3">
          <ReferenceComponent v-for="(ref, index) in task.references" :key="index" :reference="ref" @remove="removeReference(index)"/>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button type="button" @click="goBack" class="btn btn-secondary">
          Cancelar
        </button>
        <button v-if="isEditing" type="button" @click="duplicateTask" class="btn btn-secondary" :disabled="loading">
          Duplicar
        </button>
        <button type="button" @click="saveAndRunTask" class="btn btn-success" :disabled="loading">
          {{ loading ? 'Processando...' : 'Salvar e Executar' }}
        </button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
  <ReferencesDialog ref="referencesDialog" :project="project" :task-references="task.references" @update:references="updateReferences"/>
</template>

<script setup>
import { onMounted, reactive, ref, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { tasksApi } from '@/api/tasks.api.js';
import ReferencesDialog from '@/pages/project/taks/ReferencesDialog.vue';
import ReferenceComponent from '@/components/ReferenceComponent.vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const isEditing = ref(false);
const referencesDialog = ref(null);

const task = reactive({
  id: null,
  title: '',
  description: '',
  status: 'backlog',
  references: []
});

const goBack = () => {
  router.push(`/projects/${ props.project.id }`);
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
      const result = await tasksApi.createTask(taskData);
      task.id = result.data.id; // Atualiza o ID da tarefa após a criação
    }

    // Navegar de volta para a lista de tarefas
    await router.push(`/projects/${ props.project.id }`);
  } catch (error) {
    console.error(`Erro ao ${ isEditing.value ? 'atualizar' : 'salvar' } tarefa:`, error);
    alert(`Ocorreu um erro ao ${ isEditing.value ? 'atualizar' : 'salvar' } a tarefa. Por favor, tente novamente.`);
  } finally {
    loading.value = false;
  }
};

const saveAndRunTask = async () => {
  try {
    loading.value = true;

    const taskData = {
      ...task,
      projectId: props.project.id
    };

    let taskId;

    if (isEditing.value) {
      await tasksApi.updateTask(task.id, taskData);
      taskId = task.id;
    } else {
      const result = await tasksApi.createTask(taskData);
      taskId = result.data.id;
    }

    // Executar a tarefa após salvar
    await tasksApi.runTask(taskId);

    // Navegar de volta para a lista de tarefas
    await router.push(`/projects/${ props.project.id }`);
  } catch (error) {
    console.error(`Erro ao salvar e executar tarefa:`, error);
    alert(`Ocorreu um erro ao salvar e executar a tarefa. Por favor, tente novamente.`);
  } finally {
    loading.value = false;
  }
};

const loadTask = async () => {
  const taskId = route.params.taskId;

  if (!taskId) {
    return;
  }

  isEditing.value = true;

  try {
    loading.value = true;
    const response = await tasksApi.getTaskById(taskId);
    const taskData = response.data;
    task.id = taskData.id;
    task.title = taskData.title;
    task.description = taskData.description;
    task.status = taskData.status;
    task.references = taskData.references || [];
  } catch (error) {
    console.error('Erro ao carregar tarefa:', error);
    alert('Não foi possível carregar os dados da tarefa.');
    await router.push(`/projects/${ props.project.id }`);
  } finally {
    loading.value = false;
  }
};

const duplicateTask = async () => {
  try {
    loading.value = true;

    // Criar uma cópia da tarefa atual, removendo o ID para criar uma nova
    const duplicatedTaskData = {
      title: `${ task.title } (Cópia)`,
      description: task.description,
      status: 'backlog', // Define status como backlog para a nova tarefa
      references: [...task.references], // Copia as referências
      projectId: props.project.id
    };

    // Criar nova tarefa
    const result = await tasksApi.createTask(duplicatedTaskData);

    // Navegar para a página de edição da nova tarefa
    await router.push(`/projects/${ props.project.id }/tasks/${ result.data.id }`);

  } catch (error) {
    console.error('Erro ao duplicar tarefa:', error);
    alert('Ocorreu um erro ao duplicar a tarefa. Por favor, tente novamente.');
  } finally {
    loading.value = false;
  }
};

const openReferencesDialog = () => {
  referencesDialog.value.open();
};

const updateReferences = (newReferences) => {
  task.references = newReferences;
};

const removeReference = (index) => {
  task.references.splice(index, 1);
};

// Observar mudanças na rota para recarregar a tarefa quando o parâmetro taskId mudar
watch(
    () => route.params.taskId,
    async (newTaskId) => {
      if (newTaskId) {
        await loadTask();
      }
    }
);

onMounted(async () => {
  await loadTask();
});
</script>
