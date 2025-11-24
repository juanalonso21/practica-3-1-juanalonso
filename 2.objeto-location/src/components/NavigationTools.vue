<template>
  <div class="navigation-tools">
    <h2>Herramientas de Navegación</h2>
    
    <div class="input-group">
      <label for="external-url">Navegar a URL:</label>
      <input id="external-url" type="text" v-model="externalUrl" placeholder="https://..." />
    </div>
    
    <div class="button-group">
      <button class="go" @click="goToExternalUrl">Ir</button>
      <button class="reload" @click="reloadPage">Recargar Página</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const externalUrl = ref('https://franparra.com');

const reloadPage = () => {
  window.location.reload();
};

const goToExternalUrl = () => {
  if (externalUrl.value.trim()) {
    window.location.assign(externalUrl.value);
  } else {
    alert('Por favor, introduce una URL válida.');
  }
};
</script>

<style scoped>

.navigation-tools {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #1a1a1a;
  border-radius: 8px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

input {
  background-color: #333;
  border: 1px solid #555;
  color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 4px;
}

button {
  background-color: #42b883; 
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

label {
  font-size: 0.9rem;
  color: #aaa;
}
</style>