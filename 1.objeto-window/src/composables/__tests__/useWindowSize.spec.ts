
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

    // Simular el cambio de tamaño de la ventana
    window.innerWidth = 1024
    window.innerHeight = 768
    window.dispatchEvent(new Event('resize'))

    // Espere a que Vue procese el cambio de estado
    await wrapper.vm.$nextTick()

    // Verificar los valores actualizados
    expect(wrapper.vm.width).toBe(1024)
    expect(wrapper.vm.height).toBe(768)
  })
})
