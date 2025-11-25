<script setup lang="ts">
import HistoryControls from '@/components/HistoryControls.vue'
import TabNavigator from '@/components/TabNavigator.vue'
import UnsavedChangesForm from '@/components/UnsavedChangesForm.vue'
import InfiniteScrollList from '@/components/InfiniteScrollList.vue'
import { ref } from 'vue'

// Simple navigation state to switch between exercises
const currentExercise = ref<'controls' | 'tabs' | 'unsaved' | 'infinite'>('controls')
</script>

<template>
  <div class="app-container">
    <nav class="exercise-nav">
      <button @click="currentExercise = 'controls'">Controles de Historia</button>
      <button @click="currentExercise = 'tabs'">Navegación SPA</button>
      <button @click="currentExercise = 'unsaved'">Guardia sin Guardar</button>
      <button @click="currentExercise = 'infinite'">Scroll Infinito</button>
    </nav>
    <section class="exercise-content">
      <HistoryControls v-if="currentExercise === 'controls'" />
      <TabNavigator v-else-if="currentExercise === 'tabs'" />
      <UnsavedChangesForm v-else-if="currentExercise === 'unsaved'" />
      <InfiniteScrollList v-else-if="currentExercise === 'infinite'" />
    </section>
  </div>
</template>

<style scoped>
.app-container {
  padding: 1rem;
  min-height: 100vh;
  color: #fff;
}

.exercise-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.exercise-nav button {
  padding: 8px 12px;
  background-color: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 0;
  cursor: pointer;
}
</style>
