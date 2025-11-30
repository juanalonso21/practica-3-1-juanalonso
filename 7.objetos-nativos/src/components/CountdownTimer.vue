<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  targetDate: Date;
}>();

// Refs para las unidades de tiempo [cite: 880]
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const isFinished = ref(false);

let timerId: number;

// Función auxiliar para formatear con ceros a la izquierda (ej. "09") [cite: 904]
const formatTime = (value: number) => String(value).padStart(2, '0');

const updateCountdown = () => {
  const now = new Date();
  const distance = props.targetDate.getTime() - now.getTime();

  // Si la distancia es <= 0, detenemos el contador [cite: 886]
  if (distance <= 0) {
    isFinished.value = true;
    clearInterval(timerId);
    return;
  }

  // Fórmulas matemáticas requeridas [cite: 888-892]
  days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
};

onMounted(() => {
  updateCountdown(); // Ejecución inicial
  // Actualización cada segundo [cite: 896]
  timerId = window.setInterval(updateCountdown, 1000);
});

// Limpieza fundamental para evitar fugas de memoria [cite: 897]
onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<template>
  <div class="countdown-wrapper">
    <div v-if="!isFinished" class="timer-container">
      <div class="time-box">
        <span class="number">{{ days }}</span>
        <span class="label">días</span>
      </div>
      <div class="time-box">
        <span class="number">{{ formatTime(hours) }}</span>
        <span class="label">h</span>
      </div>
      <div class="time-box">
        <span class="number">{{ formatTime(minutes) }}</span>
        <span class="label">m</span>
      </div>
      <div class="time-box">
        <span class="number">{{ formatTime(seconds) }}</span>
        <span class="label">s</span>
      </div>
    </div>
    
    <div v-else class="finished-message">
      ¡El evento ha comenzado!
    </div>
  </div>
</template>

<style scoped>
.timer-container { display: flex; gap: 10px; }
.time-box { display: flex; flex-direction: column; align-items: center; }
.number { font-size: 1.5em; font-weight: bold; }
</style>