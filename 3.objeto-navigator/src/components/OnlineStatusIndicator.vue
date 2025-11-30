<script setup lang="ts">
// Importamos el composable desde la ruta donde lo creamos
import { useOnlineStatus } from '@/composables/useOnlineStatus';

// Extraemos la variable reactiva
const { isOnline } = useOnlineStatus();
</script>

<template>
  <div class="status-indicator">
    <span v-if="isOnline" class="badge success">
       Conectado
    </span>
    
    <span v-else class="badge error">
       Sin conexión
    </span>
  </div>
</template>

<style scoped>
.status-indicator {
  position: fixed; 
  top: 20px;      
  right: 20px;     
  z-index: 9999;   
}

.badge {
  padding: 6px 12px; 
  border-radius: 20px; 
  font-weight: 600;
}

.success {
  background-color: #e6fffa;
  color: #047857;
  border: 1px solid #047857;
}

.error {
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #c53030;
}
</style>