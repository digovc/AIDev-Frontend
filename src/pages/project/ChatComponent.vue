<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-6 h-full flex flex-col">
    <h2 class="text-2xl font-bold mb-4">Chat</h2>
    <div class="flex flex-col h-full">
      <!-- Área de conversação (topo, com espaço flexível) -->
      <div class="flex-grow overflow-y-auto mb-4 relative">
        <div class="absolute inset-0 overflow-y-auto">
          <ChatConversationComponent :conversation="selectedConversation"/>
        </div>
      </div>

      <!-- Área de ações do chat (meio) -->
      <div class="mb-3">
        <ChatActionsComponent
          :conversations="conversations"
          :selectedConversation="selectedConversation"
          :onSelectConversation="selectConversation"
        />
      </div>

      <!-- Área de input (parte inferior) -->
      <div>
        <ChatInputComponent :onSendMessage="sendMessage"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ChatConversationComponent from './ChatConversationComponent.vue';
import ChatActionsComponent from './ChatActionsComponent.vue';
import ChatInputComponent from './ChatInputComponent.vue';
import { conversationsApi } from '@/api/conversations.api';
import { socketIOService } from "@/services/socket.io.js";

// Obtenha a rota atual
const route = useRoute();

// Estado para armazenar todas as conversas e a conversa selecionada
const conversations = ref([]);
const selectedConversation = ref(null);

const receiveMessage = (event) => {
  if (selectedConversation.value && selectedConversation.value.id === event.conversationId) {
    selectedConversation.value.messages.push(event.message);
  }
};

const receiveDelta = (event) => {
  if (!selectedConversation.value || selectedConversation.value.id !== event.conversationId) {
    return
  }

  const message = selectedConversation.value.messages.find((message) => message.id === event.messageId);

  if (message) {
    message.tempContent += event.delta;
  }
};

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
      const response = await conversationsApi.createConversation(projectId);
      selectedConversation.value = response.data;
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
    const response = await conversationsApi.sendMessage(selectedConversation.value.id, userMessage);

    // Adiciona resposta da IA se houver
    if (response.data && response.data.message) {
      selectedConversation.value.messages.push(response.data.message);
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
};

// Carrega as conversas ao montar o componente
onMounted(() => {
  socketIOService.socket.on('message-created', receiveMessage);
  socketIOService.socket.on('message-delta', receiveDelta);
  loadConversations();
});

onUnmounted(() => {
  socketIOService.socket.off('message-created', receiveMessage);
});

// Função para selecionar uma conversa
const selectConversation = (conversation) => {
  selectedConversation.value = conversation;
};

const selectConversationById = (conversationId) => {
  const conversation = conversations.value.find(conv => conv.id === conversationId);
  if (conversation) {
    selectedConversation.value = conversation;
  }
};

defineExpose({
  selectConversationById
});
</script>
