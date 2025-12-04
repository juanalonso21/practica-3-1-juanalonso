<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePokemonFetcher } from '@/composables/usePokemonFetcher'
import { useScrollDetector } from '@/composables/useScrollDetector'

const currentPage = ref<number>(1)

const { isLoading, pokemons, loadMorePokemons } = usePokemonFetcher()

onMounted(() => {
  loadMorePokemons(currentPage.value)
})

const scrollContainer = ref<HTMLElement | null>(null)

const loadNextPage = () => {
  if (isLoading.value) return
  currentPage.value += 1
  loadMorePokemons(currentPage.value).then(() => {
    const newUrl = `?page=${currentPage.value}`
    history.replaceState({ page: currentPage.value }, '', newUrl)
  })
}

useScrollDetector(scrollContainer, loadNextPage)
</script>

<template>
  <div class="infinite-scroll" ref="scrollContainer">
    <ul class="pokemon-list">
      <li v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
        {{ pokemon.name }}
      </li>
    </ul>
    <div v-if="isLoading" class="loading-indicator">Cargando más Pokémon...</div>
  </div>
</template>

<style scoped>
.infinite-scroll {
  height: 400px; 
  overflow-y: auto;
  padding: 15px;
  background-color: #222;
  border: 1px solid #555;
}

.pokemon-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pokemon-item {
  padding: 0.5rem 0;
  color: white;
  border-bottom: 1px solid #444;
}

.loading-indicator {
  text-align: center;
  padding: 15px;
  color: #ccc;
}
</style>
