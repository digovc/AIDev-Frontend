<template>
  <div class="h-full flex flex-col p-4">
    <div v-if="loading" class="text-center py-8">
      <p class="text-lg">Carregando projeto...</p>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <!-- Coluna da esquerda (2/3 do espaço) -->
      <div class="md:col-span-2 space-y-4 flex flex-col">
        <!-- Componente de informações do projeto -->
        <ProjectInfoComponent :project="project"/>
        <!-- Router view para exibir tarefas ou formulário de tarefa -->
        <RouterView v-if="project" :project="project" class="grow" @taskSelected="handleTaskSelected"></RouterView>
      </div>

      <!-- Coluna da direita (1/3 do espaço) -->
      <div class="md:col-span-1">
        <!-- Componente de chat -->
        <ChatComponent ref="chatComponent"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { projectsApi } from '@/api/projects.api';
import ProjectInfoComponent from './ProjectInfoComponent.vue';
import ChatComponent from './ChatComponent.vue';

const route = useRoute();
const project = ref(null);
const loading = ref(true);
const error = ref(null);
const chatComponent = ref(null);

const handleTaskSelected = (task) => {
  if (task && task.conversationId && chatComponent.value) {
    chatComponent.value.selectConversationById(task.conversationId);
  }
};

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
</script>
