<template>
  <dialog ref="dialogRef" class="p-0 rounded-lg shadow-lg">
    <div class="p-6 w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ isEditing ? 'Editar Tarefa' : 'Nova Tarefa' }}</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
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
          <textarea id="description" v-model="task.description" rows="3" class="form-input"></textarea>
        </div>

        <div class="mb-6">
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="task.status" class="form-input" required>
            <option value="backlog">Backlog</option>
            <option value="running">Em Andamento</option>
            <option value="done">Concluído</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="close" class="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { tasksApi } from '@/api/tasks.api';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['task-created', 'task-updated']);
const dialogRef = ref(null);
const loading = ref(false);

const isEditing = ref(false);

const task = reactive({
  id: null,
  title: '',
  description: '',
  status: 'backlog'
});

const open = () => {
  isEditing.value = false;
  resetForm();
  dialogRef.value.showModal();
};

const openForEdit = (taskToEdit) => {
  isEditing.value = true;
  task.id = taskToEdit.id;
  task.title = taskToEdit.title;
  task.description = taskToEdit.description;
  task.status = taskToEdit.status;
  dialogRef.value.showModal();
};

const close = () => {
  dialogRef.value.close();
  resetForm();
};

const resetForm = () => {
  task.id = null;
  task.title = '';
  task.description = '';
  task.status = 'backlog';
};

const saveTask = async () => {
  try {
    loading.value = true;
    const taskData = {
      ...task,
      projectId: props.project.id
    };

    let response;

    if (isEditing.value) {
      response = await tasksApi.updateTask(task.id, taskData);
      emit('task-updated', response.data);
    } else {
      response = await tasksApi.createTask(taskData);
      emit('task-created', response.data);
    }

    close();
  } catch (error) {
    console.error(`Erro ao ${ isEditing.value ? 'atualizar' : 'salvar' } tarefa:`, error);
    alert(`Ocorreu um erro ao ${ isEditing.value ? 'atualizar' : 'salvar' } a tarefa. Por favor, tente novamente.`);
  } finally {
    loading.value = false;
  }
};

defineExpose({
  open,
  openForEdit
});
</script>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

dialog {
  border: none;
  max-width: 75vw;
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
</style>
