<template>
  <div class="flex justify-between items-center w-full">
    <!-- Select para escolher a conversa -->
    <select
      v-model="selectedConversationId"
      @change="onConversationChange"
      class="bg-gray-700 text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option v-for="conversation in conversations" :key="conversation.id" :value="conversation.id">
        {{ conversation.title || `Conversa ${conversation.id.substring(0, 6)}...` }}
      </option>
    </select>

    <!-- Botões de ação do chat -->
    <div class="flex space-x-2">
      <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
        Anexar
      </button>
      <button class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">
        Emoji
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  conversations: {
    type: Array,
    required: true
  },
  selectedConversation: {
    type: Object,
    default: null
  },
  onSelectConversation: {
    type: Function,
    required: true
  }
});

// Computed para obter o ID da conversa selecionada
const selectedConversationId = computed({
  get: () => props.selectedConversation?.id || '',
  set: () => {} // Será tratado pelo handler de change
});

// Handler para quando a conversa é alterada
const onConversationChange = (event) => {
  const conversationId = event.target.value;
  const conversation = props.conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    props.onSelectConversation(conversation);
  }
};
</script>
