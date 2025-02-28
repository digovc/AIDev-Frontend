<template>
  <div
    class="mb-3 p-3 rounded"
    :class="message.sender === 'user' ? 'bg-gray-800' : 'bg-gray-700'"
  >
    <div class="flex justify-between mb-1">
      <span
        class="font-bold"
        :class="message.sender === 'user' ? 'text-blue-400' : 'text-green-400'"
      >
        {{ message.sender === 'user' ? 'Você' : 'IA' }}
      </span>
      <span class="text-xs text-gray-500">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
    <div class="text-gray-300">
      <div v-for="(block, index) in message.blocks" :key="index">
        <!-- Renderiza diferentes tipos de blocos -->
        <p v-if="block.type === 'text'">{{ block.content }}</p>
        <pre v-else-if="block.type === 'code'" class="bg-gray-900 p-2 rounded my-2 overflow-x-auto">{{ block.content }}</pre>
        <div v-else-if="block.type === 'image'" class="my-2">
          <img :src="block.url" :alt="block.alt || 'Imagem'" class="max-w-full rounded" />
        </div>
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
