<template>
  <div class="h-full flex">
    <div class="h-full">
      <MenuComponent/>
    </div>
    <div class="grow">
      <RouterView/>
    </div>
  </div>
</template>
<script setup>
import MenuComponent from "@/pages/home/menu/MenuComponent.vue";
</script>
