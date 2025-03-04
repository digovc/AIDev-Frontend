<template>
  <div class="text-gray-300">
    <div v-if="conversation && messages && messages.length > 0" class="pr-2">
      <ChatMessageComponent v-for="message in messages" :key="message.id" :message="message"/>
    </div>
    <p v-else class="text-gray-500 italic">Histórico de mensagens aparecerá aqui</p>
  </div>
</template>

<script setup>
import ChatMessageComponent from './ChatMessageComponent.vue';
import { onMounted, onUnmounted, ref } from "vue";
import { messagesApi } from '@/api/messages.api.js';
import { socketIOService } from "@/services/socket.io.js";

const props = defineProps({
  conversation: {
    type: Object,
    default: null
  }
});

const messages = ref([]);

const loadMessages = async () => {
  const result = await messagesApi.getMessagesByConversationId(props.conversation.id);
  messages.value = result.data;
};

const messageCreated = (message) => {
  if (message.conversationId === props.conversation.id) {
    messages.value.push(message);
  }
};

const blockCreated = (block) => {
  const message = messages.value.find(m => m.id === block.messageId);

  if (message) {
    message.blocks = message.blocks || [];
    message.blocks.push(block);
  }
};

const blockDelta = (block) => {
  const message = messages.value.find(m => m.id === block.messageId);

  if (message && message.blocks && message.blocks.length > 0) {
    const localBlock = message.blocks.find(b => b.id === block.id);

    if (localBlock) {
      localBlock.content += block.delta;
    }
  }
};

onMounted(async () => {
  await loadMessages();
  socketIOService.socket.on('message-created', messageCreated);
  socketIOService.socket.on('block-created', blockCreated);
  socketIOService.socket.on('block-delta', blockDelta);
});

onUnmounted(() => {
  socketIOService.socket.off('message-created', messageCreated);
  socketIOService.socket.off('block-created', blockCreated);
  socketIOService.socket.off('block-delta', blockDelta);
});
</script>
