<template>
  <dialog ref="dialogRef" class="p-0 rounded-lg shadow-lg">
    <div class="p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Novo Projeto</h2>
        <button @click="close" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <form @submit.prevent="saveProject">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input type="text" id="name" v-model="project.name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
        </div>

        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea id="description" v-model="project.description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <div class="mb-6">
          <label for="path" class="block text-sm font-medium text-gray-700 mb-1">Caminho</label>
          <input type="text" id="path" v-model="project.path" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="close" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" :disabled="loading">
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
  path: ''
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
  max-width: 500px;
  width: 100%;
}
</style>
