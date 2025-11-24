import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FullscreenWrapper from '../FullscreenWrapper.vue';

describe('FullscreenWrapper.vue', () => {
  // Spies para los métodos nativos
  let requestFullscreenSpy: any;
  let exitFullscreenSpy: any;

  beforeEach(() => {
    // 1. Mockear requestFullscreen en el prototipo de HTMLElement
    // Esto permite que CUALQUIER elemento del DOM tenga este método simulado
    requestFullscreenSpy = vi.spyOn(HTMLElement.prototype, 'requestFullscreen')
      .mockImplementation(() => Promise.resolve());

    // 2. Mockear document.exitFullscreen
    exitFullscreenSpy = vi.spyOn(document, 'exitFullscreen')
      .mockImplementation(() => Promise.resolve());

    // 3. Mockear la propiedad de solo lectura document.fullscreenElement
    // Usamos defineProperty porque es un getter
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true, // Permitimos sobrescribirlo en los tests
      configurable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe llamar a requestFullscreen al entrar en pantalla completa', async () => {
    // Estado inicial: No hay elemento en fullscreen
    Object.defineProperty(document, 'fullscreenElement', { value: null });

    const wrapper = mount(FullscreenWrapper);
    
    // Simulamos clic
    await wrapper.find('button').trigger('click');

    // Verificamos que se llamó al método en el elemento raíz del componente
    expect(requestFullscreenSpy).toHaveBeenCalled();
    
    // Opcional: Verificar que NO se llamó a exit
    expect(exitFullscreenSpy).not.toHaveBeenCalled();
  });

  it('debe llamar a exitFullscreen si ya está en pantalla completa', async () => {
    const wrapper = mount(FullscreenWrapper);
    
    // Simulamos que NUESTRO elemento ya está en fullscreen
    // Accedemos al elemento del DOM real del wrapper
    Object.defineProperty(document, 'fullscreenElement', { 
      value: wrapper.element 
    });

    // Simulamos clic
    await wrapper.find('button').trigger('click');

    // Verificamos que se llamó a salir
    expect(exitFullscreenSpy).toHaveBeenCalled();
    expect(requestFullscreenSpy).not.toHaveBeenCalled();
  });

  it('debe actualizar el estado reactivo isFullscreen cuando ocurre el evento fullscreenchange', async () => {
    const wrapper = mount(FullscreenWrapper);
    
    // Comprobación inicial: Texto del botón para estado normal
    expect(wrapper.find('button').text()).toContain('Entrar a Pantalla Completa');

    // 1. Simulamos que el navegador ha entrado en fullscreen
    Object.defineProperty(document, 'fullscreenElement', { 
      value: wrapper.element 
    });

    // 2. Disparamos manualmente el evento que el navegador lanzaría
    document.dispatchEvent(new Event('fullscreenchange'));
    
    // Esperamos a que Vue reaccione
    await wrapper.vm.$nextTick();

    // 3. Comprobamos que el texto del botón cambió
    expect(wrapper.find('button').text()).toContain('Salir de Pantalla Completa');
    
    // 4. Simulamos salida (usuario pulsa ESC)
    Object.defineProperty(document, 'fullscreenElement', { value: null });
    document.dispatchEvent(new Event('fullscreenchange'));
    await wrapper.vm.$nextTick();
    
    // Texto vuelve a la normalidad
    expect(wrapper.find('button').text()).toContain('Entrar a Pantalla Completa');
  });
});