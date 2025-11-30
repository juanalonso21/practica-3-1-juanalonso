<script setup lang="ts">
/* 
-----------------------------------------------------------------
-----Componente para mostrar los ejercicios y sus soluciones-----
-----gestionando tanto datos estáticos como acciones en este-----
-----caso específico para el ejercicio 7.5-----------------------
-----------------------------------------------------------------
*/
interface Solution {
  id: number;
  description: string;
  data: any; // Puede ser array, objeto, string, number
  isAction?: boolean; // Para distinguir si es un botón o un dato
  action?: () => void; // La función a ejecutar si es un botón
}

defineProps<{
  title: string;
  solutions: Solution[];
}>();
</script>

<template>
  <div class="exercise-container">
    <h1>{{ title }}</h1>
    
    <div v-for="sol in solutions" :key="sol.id" class="solution-item">
      <h3>{{ sol.id }}. {{ sol.description }}</h3>
      
      <div v-if="sol.isAction">
        <button @click="sol.action">Ejecutar Acción</button>
        <details open class="output">
          <summary>Estado actual (Data):</summary>
          <pre>{{ sol.data }}</pre>
        </details>
      </div>

      <div v-else>
        <details>
          <summary>Ver Resultado</summary>
          <pre>{{ sol.data }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exercise-container { font-family: monospace; max-width: 800px; margin: 0 auto; }
.solution-item { margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
h3 { margin: 5px 0; font-size: 1.1em; color: #f7f7f7; }
button { padding: 5px 10px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; }
button:hover { background: #0056b3; }
pre { background: #1f1f1f; padding: 10px; overflow-x: auto; border-radius: 4px; max-height: 300px; }
details { margin-top: 5px; }
summary { cursor: pointer; color: #555; }
</style>