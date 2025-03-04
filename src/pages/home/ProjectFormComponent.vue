<template>
  <dialog ref="dialogRef" class="p-0 rounded-lg shadow-lg">
    <div class="p-6 w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Novo Projeto</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <form @submit.prevent="saveProject">
        <div class="mb-4">
          <label for="name" class="form-label">Nome</label>
          <input type="text" id="name" v-model="project.name" class="form-input" required/>
        </div>

        <div class="mb-4">
          <label for="description" class="form-label">Descrição</label>
          <textarea id="description" v-model="project.description" rows="15" class="form-input"></textarea>
        </div>

        <div class="mb-6">
          <label for="path" class="form-label">Caminho</label>
          <input type="text" id="path" v-model="project.path" class="form-input" required/>
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
import { projectsApi } from '@/api/projects.api';

const emit = defineEmits(['project-created']);
const dialogRef = ref(null);
const loading = ref(false);

const project = reactive({
  name: '',
  description: '',
  path: '',
  conversations: [],
  tasks: []
});

const open = () => {
  dialogRef.value.showModal();
};

const close = () => {
  dialogRef.value.close();
  resetForm();
};

const resetForm = () => {
  project.name = '';
  project.description = '';
  project.path = '';
};

const saveProject = async () => {
  try {
    loading.value = true;
    const response = await projectsApi.createProject(project);
    emit('project-created', response.data);
    close();
  } catch (error) {
    console.error('Erro ao salvar projeto:', error);
    alert('Ocorreu um erro ao salvar o projeto. Por favor, tente novamente.');
  } finally {
    loading.value = false;
  }
};

defineExpose({
  open
});
</script>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

dialog {
  border: none;
  width: 75vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
</style>
