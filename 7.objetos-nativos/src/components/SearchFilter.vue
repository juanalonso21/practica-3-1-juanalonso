<template>
  <div class="search-filter">
    <div class="input-group">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar elementos..."
        class="search-input"
      />
    </div>

    <ul class="results-list">
      <li v-for="item in filteredItems" :key="item.id" class="result-item">
        <span v-html="highlightMatches(item.name)"></span>
      </li>
      
      <li v-if="filteredItems.length === 0" class="no-results">
        No se encontraron resultados.
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Definición de la interfaz para los items
interface ListItem {
  id: number;
  name: string;
}

// 1. Definición de Props
const props = defineProps<{
  items: ListItem[];
}>();

// 2. Ref para la búsqueda
const searchQuery = ref('');

// 3. Propiedad computada para filtrar
const filteredItems = computed(() => {
  // Si está vacío, devolvemos todo
  if (!searchQuery.value.trim()) {
    return props.items;
  }

  const query = searchQuery.value.toLowerCase();
  
  // Filtro insensible a mayúsculas
  return props.items.filter(item => 
    item.name.toLowerCase().includes(query)
  );
});

// 4. Método de resaltado
const highlightMatches = (text: string): string => {
  // Si no hay búsqueda, devolvemos texto limpio
  if (!searchQuery.value.trim()) {
    return text;
  }

  try {
    // Creamos una Expresión Regular dinámica basada en el input
    // 'g': global (todas las ocurrencias)
    // 'i': case-insensitive (ignora mayúsculas/minúsculas)
    const regex = new RegExp(searchQuery.value, 'gi');

    // Reemplazamos la coincidencia envolviéndola en <mark>
    // Usamos una función callback (match) => ... para preservar 
    // las mayúsculas/minúsculas originales del texto, no de la búsqueda.
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  } catch (e) {
    // Fallback por si el usuario escribe caracteres inválidos para regex (ej: "[")
    return text;
  }
};
</script>

<style scoped>
.search-filter {
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.results-list {
  list-style: none;
  padding: 0;
  border: 1px solid #eee;
  border-radius: 4px;
}

.result-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.result-item:last-child {
  border-bottom: none;
}

.no-results {
  padding: 10px;
  color: #666;
  text-align: center;
}

/* Estilos para la etiqueta mark generada dinámicamente */
:deep(mark) {
  background-color: #ffd700; /* Amarillo dorado */
  color: #000;
  border-radius: 2px;
  padding: 0 2px;
}
</style>