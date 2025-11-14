
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ScrollToTopButton from '../ScrollToTopButton.vue'

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  it('should not be visible initially', () => {
    const wrapper = mount(ScrollToTopButton)
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('should become visible after scrolling down', async () => {
    const wrapper = mount(ScrollToTopButton)
    window.scrollY = 300
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should not be visible after scrolling up', async () => {
    const wrapper = mount(ScrollToTopButton)
    window.scrollY = 300
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').exists()).toBe(true)

    window.scrollY = 100
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('should scroll to top when clicked', async () => {
    const wrapper = mount(ScrollToTopButton)
    window.scrollY = 300
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
