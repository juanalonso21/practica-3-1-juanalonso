
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { useWindowSize } from '../useWindowSize'
import { defineComponent } from 'vue'

describe('useWindowSize', () => {
  it('should update width and height on resize', async () => {
    const TestComponent = defineComponent({
      template: '<div />',
      setup() {
        return useWindowSize()
      }
    })

    const wrapper = mount(TestComponent)

    // Initial values
    expect(wrapper.vm.width).toBe(window.innerWidth)
    expect(wrapper.vm.height).toBe(window.innerHeight)

    // Simulate window resize
    window.innerWidth = 1024
    window.innerHeight = 768
    window.dispatchEvent(new Event('resize'))

    // Wait for Vue to update
    await wrapper.vm.$nextTick()

    // Check updated values
    expect(wrapper.vm.width).toBe(1024)
    expect(wrapper.vm.height).toBe(768)
  })
})
