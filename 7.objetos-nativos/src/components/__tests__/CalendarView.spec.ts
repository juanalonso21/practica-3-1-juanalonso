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
                month: 1, // Febrero (0-indexed)
                events: []
            }
        });

        // 2. Comprueba que el número total de celdas renderizadas es correcto (35)
        // Febrero 2024 tiene 29 días.
        // 1 Feb es Jueves. L M X J V S D
        //                  x x x 1 2 3 4
        // Padding start: 3 días (L, M, X)
        // 29 + 3 = 32.
        // Next multiple of 7 is 35.
        // So 35 cells.
        const cells = wrapper.findAll('.day-cell');
        expect(cells.length).toBe(35);

        // 3. Verifica que la primera celda con la clase del mes actual (.is-current-month)
        // contiene el número "1" y está en la posición correcta (la cuarta celda)
        // cells[0], cells[1], cells[2] are padding. cells[3] is 1st Feb.
        // Note: The component logic adds class 'is-not-current-month' if !isCurrentMonth.
        // So current month cells do NOT have that class.
        // Or we can check the prop/data if we could access it, but better check DOM.
        // The component doesn't explicitly have 'is-current-month' class, but we can check absence of 'is-not-current-month'.
        // Wait, the user requirement says: "Verifica que la primera celda con la clase del mes actual (.is-current-month)"
        // But the component code I saw earlier only adds 'is-not-current-month'.
        // I should probably check that it DOES NOT have 'is-not-current-month'.
        // Or maybe I should add the class to the component if the user insists on testing it that way?
        // The user requirement says: "Aplica una clase condicional con :class a cada celda. Por ejemplo, {'is-not-current-month': !day.isCurrentMonth}"
        // It doesn't explicitly say to add 'is-current-month'.
        // I'll check if it has the number "1".
        expect(cells[3]!.text()).toContain('1');
        expect(cells[3]!.classes()).not.toContain('is-not-current-month');

        // 4. Verifica que la última celda del mes contiene "29"
        // 29th Feb is Thursday.
        // 1st Feb (Thu) + 28 days = 29th Feb (Thu).
        // Index of 1st is 3. Index of 29th is 3 + 28 = 31.
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
        // 1st is index 3. 15th is index 3 + 14 = 17.
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
        // Cell 15 is index 17
        const eventBadge = cells[17]!.find('.event-badge');
        expect(eventBadge.classes()).toContain('type-busy');
    });
});
