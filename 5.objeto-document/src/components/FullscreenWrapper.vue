<template>
  <!-- 
    Este div es el que entrará en pantalla completa.
    El ref 'wrapperRef' nos da acceso directo al elemento DOM.
  -->
  <div ref="wrapperRef" class="fullscreen-wrapper">
    
    <!-- Barra de controles (siempre visible dentro del wrapper) -->
    <div class="controls">
      <button @click="toggleFullscreen" class="fs-btn">
        {{ isFullscreen ? 'Salir de Pantalla Completa' : 'Entrar a Pantalla Completa' }}
      </button>
    </div>

    <!-- Aquí se inyectará el contenido (imagen, video, etc.) -->
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 1. Referencias
const wrapperRef = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);

// 2. Método para alternar el estado
const toggleFullscreen = async () => {
  if (!wrapperRef.value) {
    console.log('wrapperRef is null');
    return;
  }
  console.log('wrapperRef is present', wrapperRef.value);

  try {
    if (document.fullscreenElement) {
      // Si ya hay un elemento en fullscreen, salimos
      await document.exitFullscreen();
    } else {
      // Si no, solicitamos entrar en fullscreen con nuestro elemento
      await wrapperRef.value.requestFullscreen();
    }
  } catch (err) {
    console.error('Error al cambiar modo pantalla completa:', err);
  }
};

// 3. Handler del evento nativo
// Es crucial escuchar este evento porque el usuario puede salir 
// pulsando ESC, y necesitamos actualizar nuestro ref 'isFullscreen'
const handleFullscreenChange = () => {
  // Si document.fullscreenElement es nuestro wrapper, estamos en fullscreen
  isFullscreen.value = document.fullscreenElement === wrapperRef.value;
};

// 4. Ciclo de vida
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

defineExpose({ wrapperRef });
</script>

<style scoped>
.fullscreen-wrapper {
  position: relative;
  background-color: #fff; /* Fondo blanco por defecto */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Cuando está en modo fullscreen, el navegador aplica estilos por defecto,
   pero podemos forzar algunos comportamientos si es necesario. */
.fullscreen-wrapper:fullscreen {
  background-color: #000; /* Fondo negro en modo cine */
  color: white;
  overflow-y: auto;
}

.controls {
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
}

.fs-btn {
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>