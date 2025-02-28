<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Meus Projetos</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProjectComponent v-for="project in projects" :key="project.id" :project="project"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectComponent from './ProjectComponent.vue';

const projects = ref([
  {
    id: 1,
    name: "Projeto Alpha",
    description: "Um sistema de gerenciamento de tarefas com interface moderna",
    path: "/projetos/alpha"
  },
  {
    id: 2,
    name: "Aplicação Beta",
    description: "Aplicativo de controle financeiro com dashboards interativos",
    path: "/projetos/beta"
  },
  {
    id: 3,
    name: "Sistema Gamma",
    description: "Plataforma de e-commerce com integração de pagamentos",
    path: "/projetos/gamma"
  },
  {
    id: 4,
    name: "Projeto Delta",
    description: "Sistema de análise de dados com visualizações avançadas",
    path: "/projetos/delta"
  },
  {
    id: 5,
    name: "Aplicativo Omega",
    description: "Aplicativo de comunicação em tempo real para equipes",
    path: "/projetos/omega"
  }
]);
</script>
