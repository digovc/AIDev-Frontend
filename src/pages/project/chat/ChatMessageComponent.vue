<template>
  <div v-if="!isInvisible" class="mb-3 p-3 rounded" :class="isUser ? 'bg-gray-800' : 'bg-gray-700'">
    <div class="flex justify-between mb-1">
      <div class="font-bold space-x-2" :class="isUser ? 'text-blue-400' : 'text-green-400'">
        <FontAwesomeIcon :icon="icon"/>
        <span>{{ sender }}</span>
      </div>
      <span class="text-xs text-gray-500">
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
    <div class="text-gray-300 overflow-y-auto">
      <div v-for="(block, index) in message.blocks" :key="index">
        <div v-if="block.type === 'text'" class="py-4">{{ block.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { faQuestion, faRobot, faServer, faToolbox, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

const sender = computed(() => {
  switch (props.message.sender) {
    case 'user':
      return 'Você';
    case 'assistant':
      return 'AIDev';
    case 'tool':
      return 'Ferramenta';
    case 'system':
    case 'user_system':
      return 'Sistema';
    default:
      return props.message.sender;
  }
});

const icon = computed(() => {
  switch (props.message.sender) {
    case 'user':
      return faUser;
    case 'assistant':
      return faRobot;
    case 'tool':
      return faToolbox;
    case 'system':
    case 'user_system':
      return faServer;
    default:
      return faQuestion;
  }
});

const isUser = computed(() => props.message.sender === 'user');
const isInvisible = computed(() => ['system', 'user_system'].includes(props.message.sender));

const formatTime = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>
