<script setup lang="ts">
import { computed } from 'vue';
import { useGeolocation } from '@/composables/useGeolocation';
import { calculateDistance } from '@/utils/distanceCalculator';
import { friends } from '@/data/mockFriends';

// 1. Usamos el composable
const { coords, error } = useGeolocation();

// 2. Definimos el radio (1 km)
const proximityRadiusKm = 1;

// 3. Propiedad computada para filtrar amigos
const nearbyFriends = computed(() => {
  // Si aún no tenemos coordenadas del usuario, devolvemos array vacío
  if (!coords.value) return [];

  return friends.filter(friend => {
    // Calculamos distancia entre Usuario y Amigo actual
    const distance = calculateDistance(coords.value!, {
      latitude: friend.latitude,
      longitude: friend.longitude
    });
    
    // Devolvemos true solo si está dentro del radio
    return distance <= proximityRadiusKm;
  });
});
</script>

<template>
  <div class="radar-container">
    <h2>📡 Radar de Amigos</h2>

    <div class="status-panel">
      <div v-if="error" class="alert error">{{ error }}</div>
      
      <div v-else-if="coords" class="coords-box">
        <p><strong>Tu ubicación actual:</strong></p>
        <small>Lat: {{ coords.latitude.toFixed(4) }} | Lon: {{ coords.longitude.toFixed(4) }}</small>
      </div>
      
      <div v-else class="loading">
        📍 Buscando satélites...
      </div>
    </div>

    <hr />

    <div class="friends-list">
      <h3>Amigos cercanos (< {{ proximityRadiusKm }}km):</h3>

      <ul v-if="nearbyFriends.length > 0">
        <li v-for="friend in nearbyFriends" :key="friend.id" class="friend-card">
          <span class="avatar"></span>
          <span class="name">{{ friend.name }}</span>
          <span class="status-badge">¡Aquí cerca!</span>
        </li>
      </ul>

      <div v-else-if="coords" class="empty-state">
        <p>Nadie cerca por ahora. ¡Sigue moviéndote!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.radar-container {
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.alert.error {
  background: #fee2e2;
  color: #b91c1c;
  padding: 10px;
  border-radius: 8px;
}

.coords-box {
  background: #f0f9ff;
  padding: 10px;
  border-radius: 8px;
  color: #0369a1;
}

.friend-card {
  display: flex;
  align-items: center;
  background: #ecfdf5; /* Verde clarito */
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid #6ee7b7;
}

.avatar { font-size: 1.5rem; margin-right: 10px; }
.name { 
    font-weight: bold; 
    flex-grow: 1; 
    color: black;
}
.status-badge {  
    color: rgb(2, 161, 5); 
    padding: 2px 6px; 
    border-radius: 4px; 
    font-weight: bold;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 20px;
}
</style>