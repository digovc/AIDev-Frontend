<template>
  <div class="flex items-center bg-gray-700 p-3 rounded mb-2 hover:bg-gray-600 transition-colors" @click="$emit('edit', task)">
    <div class="bg-blue-600 text-white px-2 py-1 rounded font-mono text-sm mr-3">
      #{{ task.id }}
    </div>
    <div class="flex-grow">
      <h4 class="font-bold">{{ task.title }}</h4>
    </div>
    <div class="flex space-x-4 items-center">
      <button v-if="task.status !== 'running'" @click="$emit('play', task.id)" class="text-green-400 hover:text-green-300" title="Iniciar">
        <FontAwesomeIcon :icon="faPlay"/>
      </button>
      <button v-if="task.status === 'running'" @click="$emit('stop', task.id)" class="text-red-400 hover:text-red-300" title="Parar">
        <FontAwesomeIcon :icon="faStop"/>
      </button>
      <button v-if="task.status !== 'done'" @click.stop="$emit('done', task.id)" class="text-gray-400 hover:text-gray-300" title="Concluir">
        <FontAwesomeIcon :icon="faCheck"/>
      </button>
      <button @click.stop="$emit('archive', task.id)" class="text-gray-400 hover:text-gray-300" title="Arquivar">
        <FontAwesomeIcon :icon="faArchive"/>
      </button>
      <FontAwesomeIcon :icon="faCog" class="text-orange-400 animate-spin" v-if="task.isExecuting"/>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArchive, faCheck, faCog, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

defineProps({
  task: {
    type: Object,
    required: true
  }
});

defineEmits(['play', 'play-now', 'stop', 'edit', 'archive', 'done']);
</script>
