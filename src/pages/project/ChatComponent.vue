<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-6 h-full flex flex-col">
    <h2 class="text-2xl font-bold mb-4">Chat</h2>
    <div class="flex flex-col h-full">
      <div class="flex-grow overflow-y-auto mb-4 relative">
        <div class="absolute inset-0 overflow-y-auto">
          <ChatConversationComponent :conversation="selectedConversation" v-if="selectedConversation" />
        </div>
      </div>

      <div class="mb-3">
        <ChatActionsComponent :conversations="conversations" :selectedConversation="selectedConversation" :onSelectConversation="selectConversation"/>
      </div>

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

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const conversations = ref([]);
const route = useRoute();
const selectedConversation = ref(null);

const sendMessage = async (text) => {
  const projectId = route.params.id;

  if (!selectedConversation.value) {
    const response = await conversationsApi.createConversation(projectId);
    selectedConversation.value = response.data;
    conversations.value.push(selectedConversation.value);
  }

  const userMessage = {
    id: Date.now().toString(),
    conversationId: selectedConversation.value.id,
    sender: 'user',
    timestamp: new Date().toISOString(),
    blocks: [
      {
        type: 'text',
        content: text
      }
    ]
  };

  await conversationsApi.sendMessage(selectedConversation.value.id, userMessage);
};

const selectConversation = (conversation) => {
  selectedConversation.value = conversation;

  if (conversations.value.every(conv => conv.id !== conversation.id)) {
    conversations.value.push(conversation);
  }
};

const selectConversationById = async (conversationId) => {
  const conversation = conversations.value.find(conv => conv.id === conversationId);

  if (!conversation) {
    const result = await conversationsApi.getById(conversationId);
    conversations.value.push(result.data);
  }

  selectedConversation.value = conversation;
};

const conversationCreated = (conversation) => {
  if (props.project.id === conversation.projectId) {
    conversations.value.push(conversation);
    selectedConversation.value = conversation;
  }
};

onMounted(() => {
  socketIOService.socket.on('conversation-created', conversationCreated);
});

onUnmounted(() => {
  socketIOService.socket.off('conversation-created', conversationCreated);
});

defineExpose({
  selectConversationById
});
</script>
