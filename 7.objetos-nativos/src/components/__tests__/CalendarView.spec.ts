import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CalendarView from '../CalendarView.vue';

describe('CalendarView.vue', () => {
    it('Test de la estructura del calendario', () => {
        // 1. Monta el componente pasándole un mes y año conocidos
        // Febrero 2024 (bisiesto, empieza en Jueves)
        const wrapper = mount(CalendarView, {
            props: {
                year: 2024,
                month: 1, // Febrero (0-indexado)
                events: []
            }
        });

        // 2. Comprueba que el número total de celdas renderizadas es correcto (35)
        // Febrero 2024 tiene 29 días.
        // 1 Feb es Jueves. L M X J V S D
        //                  x x x 1 2 3 4
        // Padding start: 3 días (L, M, X)
        // 29 + 3 = 32.
        // Siguiente múltiplo de 7 es 35.
        // Así que 35 celdas.
        const cells = wrapper.findAll('.day-cell');
        expect(cells.length).toBe(35);

        // 3. Verifica que la primera celda con la clase del mes actual (.is-current-month)
        // contiene el número "1" y está en la posición correcta (la cuarta celda)
        // cells[0], cells[1], cells[2] son padding. cells[3] es 1 Feb.
        expect(cells[3]!.text()).toContain('1');
        expect(cells[3]!.classes()).not.toContain('is-not-current-month');

        // 4. Verifica que la última celda del mes contiene "29"
        // 29 Feb es Jueves.
        // 1 Feb (Jue) + 28 días = 29 Feb (Jue).
        // Índice del 1 es 3. Índice del 29 es 3 + 28 = 31.
        expect(cells[31]!.text()).toContain('29');
        expect(cells[31]!.classes()).not.toContain('is-not-current-month');
    });

    it('Test de la renderización de eventos', () => {
        // 1. Crea un array mock de eventos
        const events = [
            { date: new Date(2024, 1, 15), title: 'Evento Test', type: 'busy' as const }
        ];

        // 2. Monta el componente
        const wrapper = mount(CalendarView, {
            props: {
                year: 2024,
                month: 1,
                events
            }
        });

        // 3. Busca la celda del día que sabes que tiene un evento (día 15)
        // 1 es índice 3. 15 es índice 3 + 14 = 17.
        const cells = wrapper.findAll('.day-cell');
        const cell15 = cells[17];

        // 4. Comprueba que dentro de esa celda existe un elemento que representa el evento
        expect(cell15!.text()).toContain('15');
        expect(cell15!.text()).toContain('Evento Test');

        // 5. Comprueba que una celda de un día sin eventos no contiene ningún elemento de evento
        const cell16 = cells[18];
        expect(cell16!.text()).toContain('16');
        expect(cell16!.findAll('.event-badge').length).toBe(0);
    });

    it('Test de las clases condicionales', () => {
        const events = [
            { date: new Date(2024, 1, 15), title: 'Evento Busy', type: 'busy' as const }
        ];
        const wrapper = mount(CalendarView, {
            props: {
                year: 2024,
                month: 1,
                events
            }
        });

        const cells = wrapper.findAll('.day-cell');

        // 1. Verifica que las celdas de los días de relleno tienen la clase is-not-current-month
        expect(cells[0]!.classes()).toContain('is-not-current-month');

        // 2. Verifica que un evento con type: 'busy' tiene la clase event-busy aplicada
        // Celda 15 es índice 17
        const eventBadge = cells[17]!.find('.event-badge');
        expect(eventBadge.classes()).toContain('type-busy');
    });
});
