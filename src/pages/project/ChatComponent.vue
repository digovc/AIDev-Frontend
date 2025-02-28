<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-6 h-full flex flex-col">
    <h2 class="text-2xl font-bold mb-4">Chat</h2>
    <div class="flex flex-col h-full">
      <!-- Área de conversação (topo, com espaço flexível) -->
      <div class="flex-grow overflow-y-auto mb-4">
        <ChatConversationComponent :conversation="selectedConversation"/>
      </div>

      <!-- Área de ações do chat (meio) -->
      <div class="mb-3">
        <ChatActionsComponent/>
      </div>

      <!-- Área de input (parte inferior) -->
      <div>
        <ChatInputComponent :onSendMessage="sendMessage"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ChatConversationComponent from './ChatConversationComponent.vue';
import ChatActionsComponent from './ChatActionsComponent.vue';
import ChatInputComponent from './ChatInputComponent.vue';
import { conversationsApi } from '@/api/conversations.api';

// Obtenha a rota atual
const route = useRoute();

// Estado para armazenar todas as conversas e a conversa selecionada
const conversations = ref([]);
const selectedConversation = ref(null);

// Função para carregar as conversas
const loadConversations = async () => {
  try {
    const projectId = route.params.id;
    const response = await conversationsApi.getConversations(projectId);
    conversations.value = response.data;

    // Seleciona a primeira conversa se existir e nenhuma estiver selecionada
    if (conversations.value.length > 0 && !selectedConversation.value) {
      selectedConversation.value = conversations.value[0];
    }
  } catch (error) {
    console.error('Erro ao carregar conversas:', error);
  }
};

// Função para enviar uma mensagem
const sendMessage = async (messageText) => {
  const projectId = route.params.id;

  // Se não houver conversa selecionada, cria uma nova
  if (!selectedConversation.value) {
    try {
      // Aqui precisamos implementar a criação de uma nova conversa
      // Como a API de conversações não tem um método específico para isso,
      // precisamos adicionar essa funcionalidade ou adaptar o código

      // Por enquanto, vamos criar um objeto de conversa local
      // Na prática, você precisaria adicionar um método createConversation na API
      selectedConversation.value = await conversationsApi.createConversation(projectId);
      conversations.value.push(selectedConversation.value);
    } catch (error) {
      console.error('Erro ao criar conversa:', error);
      return;
    }
  }

  // Cria objeto de mensagem do usuário
  const userMessage = {
    id: Date.now().toString(),
    sender: 'user',
    timestamp: new Date().toISOString(),
    blocks: [
      {
        type: 'text',
        content: messageText
      }
    ]
  };

  // Adiciona mensagem localmente antes da resposta da API
  if (!selectedConversation.value.messages) {
    selectedConversation.value.messages = [];
  }

  selectedConversation.value.messages.push(userMessage);

  // Envia mensagem para a API
  try {
    const response = await conversationsApi.sendMessage(selectedConversation.value.id, { content: messageText });

    // Adiciona resposta da IA se houver
    if (response.data && response.data.message) {
      selectedConversation.value.messages.push(response.data.message);
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
};

// Carrega as conversas ao montar o componente
onMounted(loadConversations);
</script>
