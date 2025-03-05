<template>
  <div
    class="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex justify-between items-center">
    <div>
      <h3 class="text-lg font-semibold mb-1">{{ reference.title }}</h3>
      <div class="text-sm text-gray-300">
        <a :href="reference.url" target="_blank" class="hover:underline">{{ reference.url }}</a>
      </div>
    </div>
    <button @click.stop="$emit('remove')" class="text-red-500 hover:text-red-700">
      <span class="text-xl">&times;</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  reference: {
    type: Object,
    required: true
  }
});

defineEmits(['remove']);
</script>
