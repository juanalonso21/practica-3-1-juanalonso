<template>
  <div class="clipboard-container">
    <button 
      @click="copyText" 
      class="copy-btn"
      :disabled="!!feedbackMessage"
    >
      <span class="icon">📋</span>
      Copiar al portapapeles
    </button>

    <span 
      v-if="feedbackMessage" 
      class="feedback"
      :class="{ 'error': feedbackMessage.includes('Error') }"
    >
      {{ feedbackMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  textToCopy: string;
}>();

const feedbackMessage = ref<string>('');

const copyText = async () => {
  if (!navigator.clipboard) {
    feedbackMessage.value = 'API no soportada en este navegador';
    return;
  }

  try {
    await navigator.clipboard.writeText(props.textToCopy);
    
    // Éxito
    feedbackMessage.value = '¡Copiado!';
  } catch (err) {
    console.error('Error al copiar:', err);
    feedbackMessage.value = 'Error al copiar';
  } finally {
    setTimeout(() => {
      feedbackMessage.value = '';
    }, 2000);
  }
};
</script>

<style scoped>
.clipboard-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.copy-btn {
  padding: 8px 12px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.2s;
}

.copy-btn:hover {
  background-color: #e0e0e0;
}

.feedback {
  font-size: 0.9em;
  color: green;
  font-weight: bold;
  animation: fadeIn 0.3s ease;
}

.feedback.error {
  color: red;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>