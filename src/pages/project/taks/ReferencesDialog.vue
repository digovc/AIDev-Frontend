<template>
  <dialog ref="dialogRef" class="p-0 rounded-lg shadow-lg bg-gray-900">
    <div class="p-6 w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-white">Referências</h2>
        <button @click="close" class="text-white">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <!-- Campo de pesquisa -->
      <div class="mb-4 relative">
        <input type="text" v-model="searchQuery" @keydown="handleKeyDown" placeholder="Pesquisar referências..." class="form-input w-full"/>

        <!-- Resultados da pesquisa -->
        <div v-if="searchResults.length > 0" class="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div v-for="(result, idx) in searchResults" :key="idx" @click="selectedIndex = idx; addSelectedReference()" :class="['p-2 cursor-pointer hover:bg-gray-700', selectedIndex === idx ? 'bg-gray-700' : '']">
            <div class="font-medium">{{ result.title }}</div>
            <div class="text-sm text-gray-400 truncate">{{ result.url }}</div>
          </div>
        </div>

        <div v-if="isSearching" class="mt-2 text-sm text-gray-400">
          Buscando...
        </div>
      </div>

      <!-- Lista de referências adicionadas -->
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2">Referências Adicionadas</h3>

        <div v-if="references.length === 0" class="text-gray-400 text-center py-4">
          Nenhuma referência adicionada
        </div>

        <div v-else class="grid gap-3">
          <ReferenceComponent v-for="(ref, index) in references" :key="index" :reference="ref" @remove="removeReference(index)"/>
        </div>
      </div>


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
import { ref, watch } from 'vue';
import { referencesApi } from '@/api/references.api';
import ReferenceComponent from '@/components/ReferenceComponent.vue';
import { debounce } from 'lodash'; // Certifique-se de que lodash está instalado

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

const searchQuery = ref('');
const searchResults = ref([]);
const isSearching = ref(false);
const selectedIndex = ref(-1);

const open = () => {
  references.value = [...props.taskReferences];
  dialogRef.value.showModal();
};

const close = () => {
  dialogRef.value.close();
  resetForm();
};

const resetForm = () => {
  searchQuery.value = '';
  searchResults.value = [];
  selectedIndex.value = -1;
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

const searchReferences = debounce(async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  isSearching.value = true;
  try {
    const response = await referencesApi.search(searchQuery.value);
    searchResults.value = response.data || [];
    selectedIndex.value = searchResults.value.length > 0 ? 0 : -1;
  } catch (error) {
    console.error('Erro ao buscar referências:', error);
    searchResults.value = [];
  } finally {
    isSearching.value = false;
  }
}, 500);

watch(searchQuery, () => {
  selectedIndex.value = -1;
  searchReferences();
});

const handleKeyDown = (e) => {
  if (searchResults.value.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value + 1) % searchResults.value.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex.value = selectedIndex.value <= 0 ? searchResults.value.length - 1 : selectedIndex.value - 1;
  } else if (e.key === 'Enter' && selectedIndex.value >= 0) {
    e.preventDefault();
    addSelectedReference();
  }
};

const addSelectedReference = () => {
  if (selectedIndex.value >= 0 && searchResults.value[selectedIndex.value]) {
    const selected = searchResults.value[selectedIndex.value];
    references.value.push({
      title: selected.title,
      url: selected.url
    });
    searchQuery.value = '';
    searchResults.value = [];
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
