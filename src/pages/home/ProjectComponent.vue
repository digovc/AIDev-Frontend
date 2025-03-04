<template>
  <div
      class="bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105" @click="navigateToProject">
    <h2 class="text-xl font-semibold mb-2">{{ project.name }}</h2>
    <div class="text-sm text-gray-300 text-xs">
      <span>Path:</span> {{ project.path }}
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

const navigateToProject = () => {
  router.push(`/project/${ props.project.id }`);
};
</script>
