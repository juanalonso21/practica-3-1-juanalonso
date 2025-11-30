import { ref, onMounted, onUnmounted } from 'vue';

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine);

  const updateOnline = () => {
    isOnline.value = true;
  };

  const updateOffline = () => {
    isOnline.value = false;
  };

  onMounted(() => {
    isOnline.value = navigator.onLine;
    
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOffline);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateOnline);
    window.removeEventListener('offline', updateOffline);
  });

  return {
    isOnline
  };
}