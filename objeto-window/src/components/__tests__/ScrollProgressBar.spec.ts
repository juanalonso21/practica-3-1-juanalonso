
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ScrollProgressBar from '../ScrollProgressBar.vue'
import { nextTick } from 'vue'

describe('ScrollProgressBar', () => {
  let scrollHeightSpy, clientHeightSpy, scrollYSpy

  beforeEach(() => {
    scrollHeightSpy = vi.spyOn(document.documentElement, 'scrollHeight', 'get')
    clientHeightSpy = vi.spyOn(document.documentElement, 'clientHeight', 'get')
    scrollYSpy = vi.spyOn(window, 'scrollY', 'get')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have 0% width initially', async () => {
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(0)

    const wrapper = mount(ScrollProgressBar)
    await nextTick()

    const progressBar = wrapper.find('.progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 0%;')
  })

  it('should have 50% width when scrolled halfway', async () => {
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(750)

    const wrapper = mount(ScrollProgressBar)
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    const progressBar = wrapper.find('.progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 50%;')
  })

  it('should have 100% width when scrolled to the bottom', async () => {
    scrollHeightSpy.mockReturnValue(2000)
    clientHeightSpy.mockReturnValue(500)
    scrollYSpy.mockReturnValue(1500)

    const wrapper = mount(ScrollProgressBar)
    window.dispatchEvent(new Event('scroll'))
    await nextTick()

    const progressBar = wrapper.find('.progress-bar')
    expect(progressBar.attributes('style')).toContain('width: 100%;')
  })
})
