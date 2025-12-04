import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HistoryControls from '@/components/HistoryControls.vue'

describe('HistoryControls.vue', () => {
  const backSpy = vi.spyOn(window.history, 'back')
  const forwardSpy = vi.spyOn(window.history, 'forward')
  const goSpy = vi.spyOn(window.history, 'go')

  const wrapper = mount(HistoryControls)

  it('calls history.back() when Atrás button is clicked', async () => {
    await wrapper.find('button.back').trigger('click')
    expect(backSpy).toHaveBeenCalledTimes(1)
  })

  it('calls history.forward() when Adelante button is clicked', async () => {
    await wrapper.find('button.forward').trigger('click')
    expect(forwardSpy).toHaveBeenCalledTimes(1)
  })

  it('calls history.go(-2) when Ir 2 páginas atrás button is clicked', async () => {
    await wrapper.find('button.go-two').trigger('click')
    expect(goSpy).toHaveBeenCalledWith(-2)
  })
})
