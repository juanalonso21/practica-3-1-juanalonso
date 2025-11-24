import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import CopyToClipboard from '../CopyToClipboard.vue';

describe('CopyToClipboard.vue', () => {
  // Definimos el mock fuera para poder manipularlo en cada test
  const mockWriteText = vi.fn();

  // Configuración del entorno antes de los tests
  const setupClipboardMock = () => {
    const mockClipboard = {
      writeText: mockWriteText,
    };


    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true, 
      writable: true,
    });
  };

  beforeEach(() => {
    setupClipboardMock();
    vi.clearAllMocks(); 
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe mostrar "¡Copiado!" cuando la copia es exitosa', async () => {
    mockWriteText.mockResolvedValue(undefined);
    const wrapper = mount(CopyToClipboard, {
      props: {
        textToCopy: 'Texto de prueba',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(mockWriteText).toHaveBeenCalledWith('Texto de prueba');

    expect(wrapper.text()).toContain('¡Copiado!');
  });

  it('debe mostrar "Error al copiar" cuando la API falla', async () => {
    mockWriteText.mockRejectedValue(new Error('Copy failed'));

    const wrapper = mount(CopyToClipboard, {
      props: {
        textToCopy: 'Texto fallido',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(mockWriteText).toHaveBeenCalled();

    await new Promise(process.nextTick); 
    
    expect(wrapper.text()).toContain('Error al copiar');
  });
});