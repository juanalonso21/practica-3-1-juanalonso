import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FullscreenWrapper from '../FullscreenWrapper.vue';

describe('FullscreenWrapper.vue', () => {
  let requestFullscreenSpy: any;
  let exitFullscreenSpy: any;

  beforeEach(() => {
    // Asegurar que requestFullscreen exista en HTMLElement.prototype
    if (!HTMLElement.prototype.requestFullscreen) {
      HTMLElement.prototype.requestFullscreen = vi.fn();
    }

    // Simular (Mock) requestFullscreen
    requestFullscreenSpy = vi.spyOn(HTMLElement.prototype, 'requestFullscreen')
      .mockImplementation(() => Promise.resolve());

    // Simular document.exitFullscreen
    // Asegurar que exista
    if (!document.exitFullscreen) {
      (document as any).exitFullscreen = vi.fn();
    }
    exitFullscreenSpy = vi.spyOn(document, 'exitFullscreen')
      .mockImplementation(() => Promise.resolve());

    // Simular document.fullscreenElement
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // ¿Limpiar si agregamos métodos? No es necesario, la restauración del spy (restore) suele manejarlo,
    // pero si lo agregamos manualmente, quizás queramos eliminarlo.
    // Sin embargo, como jsdom no lo tiene nativamente, dejarlo está bien.
  });

  it('debe llamar a requestFullscreen al entrar en pantalla completa', async () => {
    const wrapper = mount(FullscreenWrapper, {
      attachTo: document.body
    });

    await wrapper.find('button').trigger('click');
    await flushPromises();

    expect(requestFullscreenSpy).toHaveBeenCalled();
    expect(exitFullscreenSpy).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('debe llamar a exitFullscreen si ya está en pantalla completa', async () => {
    const wrapper = mount(FullscreenWrapper, {
      attachTo: document.body
    });

    // Simular que nuestro elemento ya está en pantalla completa
    vi.spyOn(document, 'fullscreenElement', 'get').mockReturnValue((wrapper.vm as any).wrapperRef);

    await wrapper.find('button').trigger('click');
    await flushPromises();

    expect(exitFullscreenSpy).toHaveBeenCalled();
    expect(requestFullscreenSpy).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('debe actualizar el estado reactivo isFullscreen cuando ocurre el evento fullscreenchange', async () => {
    const wrapper = mount(FullscreenWrapper, {
      attachTo: document.body
    });

    expect(wrapper.find('button').text()).toContain('Entrar a Pantalla Completa');

    // Simular entrar a pantalla completa
    vi.spyOn(document, 'fullscreenElement', 'get').mockReturnValue((wrapper.vm as any).wrapperRef);

    document.dispatchEvent(new Event('fullscreenchange'));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('button').text()).toContain('Salir de Pantalla Completa');

    // Simular salir de pantalla completa
    vi.spyOn(document, 'fullscreenElement', 'get').mockReturnValue(null);
    document.dispatchEvent(new Event('fullscreenchange'));
    await wrapper.vm.$nextTick();

    expect(wrapper.find('button').text()).toContain('Entrar a Pantalla Completa');

    wrapper.unmount();
  });
});