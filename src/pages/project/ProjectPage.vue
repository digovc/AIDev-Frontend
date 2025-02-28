<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center py-8">
      <p class="text-lg">Carregando projeto...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-else class="bg-gray-900 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">{{ project?.name }}</h1>
      <p class="mb-6 text-lg">{{ project?.description }}</p>
      <div class="text-gray-300">
        <span class="font-semibold">Path:</span> {{ project?.path }}
      </div>
      <div class="mt-8">
        <button @click="goBack" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Voltar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projectsApi } from '@/api/projects.api';

const route = useRoute();
const router = useRouter();
const project = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  if (route.params.id) {
    try {
      loading.value = true;
      const response = await projectsApi.getProjectById(route.params.id);
      project.value = response.data;
    } catch (e) {
      console.error('Erro ao carregar dados do projeto:', e);
      error.value = 'Não foi possível carregar o projeto. Tente novamente mais tarde.';
    } finally {
      loading.value = false;
    }
  }
});

const goBack = () => {
  router.push('/');
};
</script>
