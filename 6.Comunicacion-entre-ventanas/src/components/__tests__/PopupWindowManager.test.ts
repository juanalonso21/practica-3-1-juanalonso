import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PopupWindowManager from '../PopupWindowManager.vue'

describe('PopupWindowManager', () => {
  let mockWindow: any

  beforeEach(() => {
    mockWindow = {
      close: vi.fn(),
      closed: false
    }
    vi.stubGlobal('open', vi.fn().mockReturnValue(mockWindow))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('opens popup successfully', async () => {
    const wrapper = mount(PopupWindowManager)
    const openButton = wrapper.findAll('button')[0]
    const closeButton = wrapper.findAll('button')[1]

    await openButton.trigger('click')

    expect(window.open).toHaveBeenCalledWith('https://franparra.com', '_blank', 'width=600,height=400')
    expect(openButton.attributes('disabled')).toBeDefined()
    expect(closeButton.attributes('disabled')).toBeUndefined()
  })

  it('closes popup', async () => {
    const wrapper = mount(PopupWindowManager)
    const openButton = wrapper.findAll('button')[0]
    const closeButton = wrapper.findAll('button')[1]

    await openButton.trigger('click')
    await closeButton.trigger('click')

    expect(mockWindow.close).toHaveBeenCalled()
    expect(openButton.attributes('disabled')).toBeUndefined()
    expect(closeButton.attributes('disabled')).toBeDefined()
  })

  it('handles popup blocked by browser', async () => {
    vi.stubGlobal('open', vi.fn().mockReturnValue(null))
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const wrapper = mount(PopupWindowManager)
    const openButton = wrapper.findAll('button')[0]
    const closeButton = wrapper.findAll('button')[1]

    await openButton.trigger('click')

    expect(consoleSpy).toHaveBeenCalledWith('Popup blocked by browser')
    expect(openButton.attributes('disabled')).toBeUndefined()
    expect(closeButton.attributes('disabled')).toBeDefined()
  })

  it('computed isOpen works correctly', async () => {
    const wrapper = mount(PopupWindowManager)
    const openButton = wrapper.findAll('button')[0]
    const closeButton = wrapper.findAll('button')[1]

    expect(wrapper.text()).toContain('Estado: Cerrado')

    await openButton.trigger('click')
    expect(wrapper.text()).toContain('Estado: Abierto')

    await closeButton.trigger('click')
    expect(wrapper.text()).toContain('Estado: Cerrado')
  })
})
