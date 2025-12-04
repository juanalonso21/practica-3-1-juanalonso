import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchFilter from '../SearchFilter.vue';

describe('SearchFilter.vue', () => {
  // Datos de prueba
  const mockItems = [
    { id: 1, name: 'Introducción a Vue.js' },
    { id: 2, name: 'Componentes Avanzados' },
    { id: 3, name: 'Vue Router y Pinia' },
    { id: 4, name: 'JavaScript Moderno' },
    { id: 5, name: 'Fundamentos de React' }
  ];

  it('debe filtrar la lista correctamente cuando se escribe en el input', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: mockItems }
    });

    // 1. Simular escritura en el input
    const input = wrapper.find('input');
    await input.setValue('Vue');

    // 2. Obtener los elementos renderizados
    const listItems = wrapper.findAll('li.result-item');

    // 3. Comprobación: Debería haber 2 resultados ('Introducción a Vue.js' y 'Vue Router y Pinia')
    expect(listItems).toHaveLength(2);

    // Comprobamos que el texto filtrado es correcto
    expect(listItems[0]!.text()).toContain('Introducción a Vue.js');
    expect(listItems[1]!.text()).toContain('Vue Router y Pinia');
  });

  it('debe resaltar el texto coincidente con la etiqueta <mark> (insensible a mayúsculas/minúsculas)', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: mockItems }
    });

    // 1. Buscamos "java" en minúsculas para probar la insensibilidad
    const input = wrapper.find('input');
    await input.setValue('java');

    // Debería encontrar "JavaScript Moderno"
    const listItems = wrapper.findAll('li.result-item');
    expect(listItems).toHaveLength(1);

    // 2. Seleccionamos el elemento span que contiene el v-html
    const resultSpan = listItems[0]!.find('span');

    // 3. DESAFÍO: Comprobamos el HTML interno
    // Esperamos que "Java" (con J mayúscula original) esté envuelto en <mark>
    // aunque buscamos "java" (minúscula).
    const expectedHTML = '<mark>Java</mark>Script Moderno';

    expect(resultSpan.element.innerHTML).toBe(expectedHTML);
  });

  it('debe mostrar todos los elementos si la búsqueda está vacía', async () => {
    const wrapper = mount(SearchFilter, {
      props: { items: mockItems }
    });

    const listItems = wrapper.findAll('li.result-item');
    expect(listItems).toHaveLength(5);
  });
});