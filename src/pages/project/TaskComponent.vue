<template>
  <div class="flex items-center bg-gray-700 p-3 rounded mb-2 hover:bg-gray-600 transition-colors">
    <div class="bg-blue-600 text-white px-2 py-1 rounded mr-3 font-mono text-sm">
      #{{ task.id }}
    </div>
    <div class="flex-grow">
      <h4 class="font-bold">{{ task.title }}</h4>
    </div>
    <div class="flex space-x-4">
      <button v-if="task.status !== 'running'" @click="$emit('play', task.id)" class="text-green-400 hover:text-green-300" title="Iniciar">
        <FontAwesomeIcon :icon="faPlay"/>
      </button>
      <button v-if="task.status !== 'running'" @click="$emit('play-now', task.id)" class="text-yellow-400 hover:text-yellow-300" title="Iniciar agora (prioridade)">
        <FontAwesomeIcon :icon="faBoltLightning"/>
      </button>
      <button v-if="task.status === 'running'" @click="$emit('stop', task.id)" class="text-red-400 hover:text-red-300" title="Parar">
        <FontAwesomeIcon :icon="faStop"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBoltLightning, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['play', 'play-now', 'stop']);
</script>
