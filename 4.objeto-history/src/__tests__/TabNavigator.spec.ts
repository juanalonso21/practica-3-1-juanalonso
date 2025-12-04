import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TabNavigator from '@/components/TabNavigator.vue'

describe('TabNavigator.vue', () => {
  const pushStateSpy = vi.spyOn(window.history, 'pushState')

  const wrapper = mount(TabNavigator)

  it('calls history.pushState with correct arguments when Facturación tab is clicked', async () => {
    await wrapper.find('button.tab:nth-child(2)').trigger('click') 
    expect(pushStateSpy).toHaveBeenCalledTimes(1)
    expect(pushStateSpy).toHaveBeenCalledWith({ tab: 'facturacion' }, '', '/settings/facturacion')
  })

  it('displays the correct content for the selected tab', async () => {
    await wrapper.find('button.tab:nth-child(3)').trigger('click')
    expect(wrapper.text()).toContain('Contenido de Seguridad')
  })
})
