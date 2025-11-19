import { ref, onMounted, onUnmounted } from 'vue';

export function useOnlineStatus() {
  // Inicializamos el ref con el valor actual del navegador
  const isOnline = ref(navigator.onLine);

  // Definimos las funciones manejadoras para los eventos
  const updateOnline = () => {
    isOnline.value = true;
  };

  const updateOffline = () => {
    isOnline.value = false;
  };

  onMounted(() => {
    // Actualizamos el valor inicial por seguridad
    isOnline.value = navigator.onLine;
    
    // Añadimos los event listeners al objeto window
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOffline);
  });

  onUnmounted(() => {
    // Limpieza fundamental: eliminamos los listeners al destruir el componente
    window.removeEventListener('online', updateOnline);
    window.removeEventListener('offline', updateOffline);
  });

  // Retornamos el ref para que pueda ser usado
  return {
    isOnline
  };
}