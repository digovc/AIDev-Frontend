<template>
  <div class="mb-3 p-3 rounded" :class="message.sender === 'user' ? 'bg-gray-800' : 'bg-gray-700'">
    <div class="flex justify-between mb-1">
      <span class="font-bold" :class="message.sender === 'user' ? 'text-blue-400' : 'text-green-400'">
        {{ message.sender === 'user' ? 'Você' : 'IA' }}
      </span> <span class="text-xs text-gray-500">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
    <div class="text-gray-300 overflow-y-auto">
      <div v-for="(block, index) in message.blocks" :key="index">
        <div v-if="block.type === 'text'">{{ block.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

// Função para formatar o timestamp
const formatTime = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>
