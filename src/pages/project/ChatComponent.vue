<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-6 h-full flex flex-col">
    <h2 class="text-2xl font-bold mb-4">Chat</h2>
    <div class="flex flex-col h-full">
      <!-- Área de conversação (topo, com espaço flexível) -->
      <div class="flex-grow overflow-y-auto mb-4">
        <ChatConversationComponent/>
      </div>

      <!-- Área de ações do chat (meio) -->
      <div class="mb-3">
        <ChatActionsComponent/>
      </div>

      <!-- Área de input (parte inferior) -->
      <div>
        <ChatInputComponent/>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatConversationComponent from './ChatConversationComponent.vue';
import ChatActionsComponent from './ChatActionsComponent.vue';
import ChatInputComponent from './ChatInputComponent.vue';
</script>
