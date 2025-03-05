<template>
  <div class="flex items-center w-full gap-2">
    <!-- Select para escolher a conversa -->
    <label for="conversation" class="text-white">Conversas:</label>
    <select v-model="selectedConversationId" @change="onConversationChange" class="bg-gray-700 text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option v-for="conversation in conversations" :key="conversation.id" :value="conversation.id">
        {{ conversation.title || `Conversa ${ conversation.id.substring(0, 6) }...` }}
      </option>
    </select>

    <!-- Botões de ação do chat -->
    <div class="flex space-x-2">
      <!--      <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">-->
      <!--        Anexar-->
      <!--      </button>-->
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

const selectedConversationId = computed(() => props.selectedConversation?.id || '');

const onConversationChange = (event) => {
  const conversationId = event.target.value;
  const conversation = props.conversations.find(conv => conv.id === conversationId);
  if (conversation) {
    props.onSelectConversation(conversation);
  }
};
</script>
