<template>
  <div class="container mx-auto p-4">
    <div class="bg-gray-900 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const project = ref(null);

onMounted(() => {
  // Recupera o projeto dos parâmetros da rota
  if (route.params.project) {
    try {
      project.value = JSON.parse(decodeURIComponent(route.params.project));
    } catch (e) {
      console.error('Erro ao decodificar dados do projeto:', e);
    }
  }
});

const goBack = () => {
  router.push('/');
};
</script>
