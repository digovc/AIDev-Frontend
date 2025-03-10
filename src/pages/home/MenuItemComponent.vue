<template>
  <div class="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200" :class="{ 'bg-gray-200': isActive }" @click="$emit('select')">
    <FontAwesomeIcon :icon="icon" class="w-6 h-6 mr-3"/>
    <span class="text-md">{{ label }}</span>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  icon: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>
