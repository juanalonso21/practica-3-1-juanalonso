<template>
  <div class="demo-container">
    <h2>Funciones de Redirección</h2>
    
    <div class="function-demo">
      <h3>2.1 Seleccionar Navegador</h3>
      <p>Detecta tu navegador y redirige a la página del navegador</p>
      <button @click="handleSelectNav">Detectar Navegador</button>
    </div>

    <div class="function-demo">
      <h3>2.2 Redirección con Timer</h3>
      <p>Redirige después de un tiempo específico</p>
      <input v-model="timerUrl" type="text" placeholder="URL destino" />
      <input v-model.number="timerSeconds" type="number" placeholder="Segundos" min="1" />
      <button @click="handleRedirectWithTimer">Iniciar Timer</button>
    </div>

    <div class="function-demo">
      <h3>2.3 Redirección a HTTPS</h3>
      <p>Redirige a HTTPS si estás en HTTP</p>
      <button @click="handleEnforceHTTPS">Forzar HTTPS</button>
    </div>

    <div class="function-demo">
      <h3>2.4 Redirección por Idioma</h3>
      <p>Tiene que tener /?lang=en o /?lang=es en la URL</p>
      <button @click="handleRedirectByLanguage">Redirigir según idioma</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { selectNav, redirectWithTimer, redirectByLanguage, enforceHTTPS } from '../utils/redirections';

const timerUrl = ref('https://franparra.com');
const timerSeconds = ref(5);

const handleSelectNav = () => {
  selectNav();
};

const handleRedirectWithTimer = () => {
  redirectWithTimer(timerUrl.value, timerSeconds.value);
};

const handleEnforceHTTPS = () => {
  enforceHTTPS();
};

const handleRedirectByLanguage = () => {
  redirectByLanguage();
};
</script>

<style scoped>
.demo-container {
  background-color: #1a1a1a;
  color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.function-demo {
  background-color: #2a2a2a;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.function-demo h3 {
  margin-top: 0;
  color: #42b883;
}

.function-demo p {
  margin: 0.5rem 0;
}

.function-demo small {
  color: #aaa;
}

input {
  background-color: #333;
  border: 1px solid #555;
  color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
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

button:hover {
  background-color: #35a372;
}
</style>
