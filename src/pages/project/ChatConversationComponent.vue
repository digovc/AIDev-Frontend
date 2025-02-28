<template>
  <div class="text-gray-300">
    <div v-if="conversation && conversation.messages && conversation.messages.length > 0">
      <ChatMessageComponent v-for="message in conversation.messages" :key="message.id" :message="message"/>
    </div>
    <p v-else class="text-gray-500 italic">Histórico de mensagens aparecerá aqui</p>
  </div>
</template>

<script setup>
import ChatMessageComponent from './ChatMessageComponent.vue';

const props = defineProps({
  conversation: {
    type: Object,
    default: null
  }
});
</script>
