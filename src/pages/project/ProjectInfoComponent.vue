<template>
  <div class="bg-gray-900 rounded-lg shadow-md p-4">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold mb-1">{{ project?.name }}</h1>
        <div class="text-gray-300 text-xs">
          Path: {{ project?.path }}
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button @click="editProject" class="text-gray-400 hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="backToHome" class="text-gray-400 hover:text-gray-200">
          <span class="text-2xl">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

const backToHome = () => {
  router.push('/home');
};

const editProject = () => {
  router.push(`/projects/${props.project.id}/edit`);
};
</script>
