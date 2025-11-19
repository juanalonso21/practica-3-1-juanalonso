import { ref, onMounted, onUnmounted } from 'vue';

export function useGeolocation() {
  // Refs para estado
  const coords = ref<{ latitude: number; longitude: number } | null>(null);
  const error = ref<string | null>(null);
  
  // Variable para guardar el ID del watcher y poder limpiarlo después
  let watchId: number | null = null;

  onMounted(() => {
    if (!navigator.geolocation) {
      error.value = "Geolocalización no soportada por este navegador.";
      return;
    }

    // watchPosition se ejecuta cada vez que el GPS detecta un cambio
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        coords.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        error.value = null; // Limpiamos error si tenemos éxito
      },
      (err) => {
        error.value = `Error obteniendo ubicación: ${err.message}`;
      },
      {
        enableHighAccuracy: true, // Mayor precisión (consume más batería)
        timeout: 5000,
        maximumAge: 0
      }
    );
  });

  onUnmounted(() => { // Esto es pra detener la geolocalización cuando el componente se destruye
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }
  });

  return { coords, error };
}