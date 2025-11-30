import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DropDownMenu from '../DropDownMenu.vue';

describe('DropdownMenu.vue + useClickOutside', () => {

  it('debe cerrar el menú al hacer clic fuera (en document.body)', async () => {
    const wrapper = mount(DropDownMenu, {
      attachTo: document.body
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.menu-content').exists()).toBe(true);
    await document.body.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      composed: true
    }));
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.menu-content').exists()).toBe(false);
    wrapper.unmount();
  });

  it('debe mantener el menú visible al hacer clic dentro del mismo', async () => {
    const wrapper = mount(DropDownMenu, {
      attachTo: document.body
    });

    await wrapper.find('button').trigger('click');

    const menu = wrapper.find('.menu-content');
    expect(menu.exists()).toBe(true);
    await menu.trigger('click');
    expect(wrapper.find('.menu-content').exists()).toBe(true);

    wrapper.unmount();
  });
});