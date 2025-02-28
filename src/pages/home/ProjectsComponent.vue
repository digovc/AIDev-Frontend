<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Meus Projetos</h1>
      <button @click="showProjectForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Novo Projeto
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ProjectComponent v-for="project in projects" :key="project.id" :project="project"/>
    </div>
    <ProjectFormComponent ref="projectFormRef" @project-created="onProjectCreated"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { projectsApi } from '@/api/projects.api';
import ProjectComponent from './ProjectComponent.vue';
import ProjectFormComponent from './ProjectFormComponent.vue';

const projects = ref([]);
const projectFormRef = ref(null);

const fetchProjects = async () => {
  try {
    const response = await projectsApi.getAllProjects();
    projects.value = response.data;
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
  }
};

const showProjectForm = () => {
  projectFormRef.value.open();
};

const onProjectCreated = (newProject) => {
  projects.value.push(newProject);
};

onMounted(() => {
  fetchProjects();
});
</script>
