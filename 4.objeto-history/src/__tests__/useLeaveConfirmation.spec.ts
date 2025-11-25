import { ref, defineComponent } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useLeaveConfirmation } from '@/composables/useLeaveConfirmation'

describe('useLeaveConfirmation composable', () => {
  const addSpy = vi.spyOn(window, 'addEventListener')
  const removeSpy = vi.spyOn(window, 'removeEventListener')

  it('does not add listener when hasUnsavedChanges is false', () => {
    const TestComponent = defineComponent({
      setup() {
        const hasUnsaved = ref(false)
        useLeaveConfirmation(hasUnsaved)
        return { hasUnsaved }
      },
      template: '<div></div>'
    })
    mount(TestComponent)
    expect(addSpy).not.toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })

  it('adds listener when hasUnsavedChanges becomes true', async () => {
    const TestComponent = defineComponent({
      setup() {
        const hasUnsaved = ref(false)
        useLeaveConfirmation(hasUnsaved)
        return { hasUnsaved }
      },
      template: '<div></div>'
    })
    const wrapper = mount(TestComponent)
    // toggle to true
    wrapper.vm.hasUnsaved = true
    await new Promise((r) => setTimeout(r, 0)) // next tick
    expect(addSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })

  it('removes listener when hasUnsavedChanges becomes false again', async () => {
    const TestComponent = defineComponent({
      setup() {
        const hasUnsaved = ref(true)
        useLeaveConfirmation(hasUnsaved)
        return { hasUnsaved }
      },
      template: '<div></div>'
    })
    const wrapper = mount(TestComponent)
    // toggle to false
    wrapper.vm.hasUnsaved = false
    await new Promise((r) => setTimeout(r, 0))
    expect(removeSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))
  })
})
