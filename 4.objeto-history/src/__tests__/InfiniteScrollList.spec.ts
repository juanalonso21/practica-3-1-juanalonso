import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import InfiniteScrollList from '@/components/InfiniteScrollList.vue'

// Mock fetch globally
const mockPokemons = (page: number) => {
  const start = (page - 1) * 20 + 1
  const results = Array.from({ length: 20 }, (_, i) => ({
    name: `pokemon-${start + i}`,
    url: `https://pokeapi.co/api/v2/pokemon/${start + i}/`,
  }))
  return { results }
}

describe('InfiniteScrollList.vue', () => {
  let fetchSpy: any
  let replaceStateSpy: any

  beforeEach(() => {
    vi.clearAllMocks()
    fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((input: string | URL | Request) => {
      const urlObj = new URL(input.toString())
      const limit = Number(urlObj.searchParams.get('limit'))
      const offset = Number(urlObj.searchParams.get('offset'))
      const page = offset / limit + 1
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemons(page)),
      } as any)
    })
    replaceStateSpy = vi.spyOn(window.history, 'replaceState')
  })

  it('loads first page on mount and renders items', async () => {
    const wrapper = mount(InfiniteScrollList)
    // wait for async load
    await new Promise((r) => setTimeout(r, 0))
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('.pokemon-item').length).toBe(20)
    expect(wrapper.text()).toContain('pokemon-1')
  })

  it('loads next page when scroll near bottom and updates URL', async () => {
    const wrapper = mount(InfiniteScrollList)
    await new Promise((r) => setTimeout(r, 0))
    // Simulate scroll near bottom by calling the scroll handler directly
    const scrollContainer = wrapper.find('.infinite-scroll').element as HTMLElement
    // Force scroll values
    Object.defineProperty(scrollContainer, 'scrollTop', { value: 1000, writable: true })
    Object.defineProperty(scrollContainer, 'scrollHeight', { value: 1200, writable: true })
    Object.defineProperty(scrollContainer, 'clientHeight', { value: 200, writable: true })
    // Trigger scroll event
    await scrollContainer.dispatchEvent(new Event('scroll'))
    // Wait for next load
    await new Promise((r) => setTimeout(r, 0))
    expect(fetchSpy).toHaveBeenCalledTimes(2)
    expect(replaceStateSpy).toHaveBeenCalledWith({ page: 2 }, '', '?page=2')
    expect(wrapper.findAll('.pokemon-item').length).toBe(40)
  })
})
