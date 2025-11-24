import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import NavigationTools from '../NavigationTools.vue';

describe('NavigationTools.vue', () => {
  let assignMock: Mock;
  let reloadMock: Mock;

  beforeEach(() => {
    assignMock = vi.fn();
    reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: assignMock, reload: reloadMock },
    });
  });

  it('debe llamar a window.location.reload() al hacer clic en "Recargar Página"', async () => {
    const wrapper = mount(NavigationTools);

    await wrapper.find('button.reload').trigger('click');

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  it('debe llamar a window.location.assign() con la URL por defecto al hacer clic en "Ir"', async () => {
    const wrapper = mount(NavigationTools);
    const defaultUrl = 'https://franparra.com';

    await wrapper.find('button.go').trigger('click');

    expect(assignMock).toHaveBeenCalledWith(defaultUrl);
  });

  it('debe llamar a window.location.assign() con la URL introducida por el usuario', async () => {
    const wrapper = mount(NavigationTools);
    const customUrl = 'https://example.com';

    const input = wrapper.find('input[type="text"]');
    await input.setValue(customUrl);
    await wrapper.find('button.go').trigger('click');

    expect(assignMock).toHaveBeenCalledWith(customUrl);
  });
});