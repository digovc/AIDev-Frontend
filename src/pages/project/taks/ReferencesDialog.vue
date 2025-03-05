<template>
  <dialog ref="dialogRef" class="p-0 rounded-lg shadow-lg bg-gray-900">
    <div class="p-6 w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-white">Referências</h2>
        <button @click="close" class="text-white">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <div class="mb-4">
        <div v-if="references.length === 0" class="text-gray-400 text-center py-4">
          Nenhuma referência adicionada
        </div>

        <ul v-else class="space-y-2">
          <li v-for="(ref, index) in references" :key="index" class="flex justify-between items-center p-2 bg-gray-800 rounded">
            <div>
              <div class="font-medium">{{ ref.title }}</div>
              <div class="text-sm text-gray-400">{{ ref.url }}</div>
            </div>
            <button @click="removeReference(index)" class="text-red-500 hover:text-red-700">
              <span class="text-xl">&times;</span>
            </button>
          </li>
        </ul>
      </div>

      <form @submit.prevent="addReference" class="mb-4 border-t border-gray-700 pt-4">
        <div class="mb-3">
          <label for="refTitle" class="form-label">Título</label>
          <input type="text" id="refTitle" v-model="newReference.title" class="form-input" required/>
        </div>

        <div class="mb-3">
          <label for="refUrl" class="form-label">URL</label>
          <input type="url" id="refUrl" v-model="newReference.url" class="form-input" required/>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="btn btn-primary">Adicionar</button>
        </div>
      </form>

      <div class="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-700">
        <button type="button" @click="close" class="btn btn-secondary">
          Fechar
        </button>
        <button type="button" @click="saveReferences" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';

const props = defineProps({
  taskReferences: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:references']);
const dialogRef = ref(null);
const loading = ref(false);
const references = ref([...props.taskReferences]);

const newReference = reactive({
  title: '',
  url: ''
});

const open = () => {
  references.value = [...props.taskReferences];
  dialogRef.value.showModal();
};

const close = () => {
  dialogRef.value.close();
  resetForm();
};

const resetForm = () => {
  newReference.title = '';
  newReference.url = '';
};

const addReference = () => {
  references.value.push({
    title: newReference.title,
    url: newReference.url
  });
  resetForm();
};

const removeReference = (index) => {
  references.value.splice(index, 1);
};

const saveReferences = () => {
  loading.value = true;
  try {
    emit('update:references', references.value);
    close();
  } catch (error) {
    console.error('Erro ao salvar referências:', error);
  } finally {
    loading.value = false;
  }
};

defineExpose({
  open
});
</script>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

dialog {
  border: none;
  width: 75vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
}
</style>
