<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Meus Assistentes</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AssistantComponent v-for="assistant in assistants" :key="assistant.id" :assistant="assistant"/>
    </div>
    <div v-if="assistants.length === 0" class="text-center py-10 text-gray-400">
      Nenhum assistente cadastrado
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AssistantComponent from './AssistantComponent.vue';
// Importe o API de assistentes quando disponível
// import { assistantsApi } from '@/api/assistants.api.js';

const assistants = ref([
  // Dados mockados para desenvolvimento
  {
    id: '1',
    name: 'AIDev',
    profile: 'Assistente virtual especializado em desenvolvimento de software, capaz de auxiliar em tarefas de codificação, análise de requisitos e suporte técnico.',
    provider: 'OpenAI',
    model: 'GPT-4'
  },
  {
    id: '2',
    name: 'CodeHelper',
    profile: 'Assistente focado em resolver problemas de programação, depuração de código e melhores práticas de desenvolvimento.',
    provider: 'Anthropic',
    model: 'Claude-2'
  }
]);

// Descomentar quando a API estiver disponível
// const fetchAssistants = async () => {
//   try {
//     const response = await assistantsApi.getAllAssistants();
//     assistants.value = response.data;
//   } catch (error) {
//     console.error('Erro ao carregar assistentes:', error);
//   }
// };

// onMounted(() => {
//   fetchAssistants();
// });
</script>
