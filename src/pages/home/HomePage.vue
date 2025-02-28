<template>
  <div class="h-full">
    <ProjectsComponent/>
  </div>
</template>
<script setup>
import ProjectsComponent from "@/pages/home/ProjectsComponent.vue";
import { onMounted } from "vue";
import { socketIOService } from "@/services/socket.io.js";

onMounted(() => {
  socketIOService.listen(() => {
    console.log("socket connected");
  });
});
</script>
