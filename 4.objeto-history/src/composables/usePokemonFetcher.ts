import { ref } from 'vue'

interface Pokemon {
  name: string
  url: string
}

interface PokemonApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export function usePokemonFetcher() {
  const isLoading = ref(false)
  const pokemons = ref<Pokemon[]>([])

  const loadMorePokemons = async (page: number) => {
    const limit = 20
    const offset = (page - 1) * limit
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    isLoading.value = true
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon: ${response.status}`)
      }
      const data: PokemonApiResponse = await response.json()
      pokemons.value = [...pokemons.value, ...data.results]
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, pokemons, loadMorePokemons }
}
