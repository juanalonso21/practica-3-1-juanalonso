import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import CountdownTimer from '../CountdownTimer.vue';

describe('CountdownTimer.vue', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Test del estado inicial', async () => {
        // 1. Fija una "hora actual" en tu test
        // 2025-11-20T10:00:00Z
        const now = 1763632800000;
        vi.setSystemTime(now);

        // 2. Monta el componente pasándole una targetDate futura
        // 1 día, 2 horas, 30 minutos y 30 segundos después
        // 1 día = 86400000
        // 2 horas = 7200000
        // 30 mins = 1800000
        // 30 secs = 30000
        // Total = 95430000
        const targetDate = new Date(now + 95430000);

        const wrapper = mount(CountdownTimer, {
            props: {
                targetDate
            }
        });

        await wrapper.vm.$nextTick();

        // 3. Comprueba que los valores iniciales renderizados son los correctos
        const numbers = wrapper.findAll('.number');
        expect(numbers[0].text()).toBe('1'); // días
        expect(numbers[1].text()).toBe('02'); // horas
        expect(numbers[2].text()).toBe('30'); // minutos
        expect(numbers[3].text()).toBe('30'); // segundos
    });

    it('Test de la actualización por segundo', async () => {
        const now = 1763632800000;
        vi.setSystemTime(now);
        const targetDate = new Date(now + 95430000);
        const wrapper = mount(CountdownTimer, {
            props: { targetDate }
        });

        // 1. Avanza el tiempo 1 segundo
        vi.advanceTimersByTime(1000);

        // 2. Espera la actualización del DOM
        await wrapper.vm.$nextTick();

        // 3. Comprueba que el valor de los segundos ha disminuido en 1
        // Debería ser 29 segundos
        const numbers = wrapper.findAll('.number');
        expect(numbers[3].text()).toBe('29');
    });

    it('Test de finalización de la cuenta atrás', async () => {
        const now = 1763632800000;
        vi.setSystemTime(now);
        // 5 segundos para terminar
        const targetDate = new Date(now + 5000);
        const wrapper = mount(CountdownTimer, {
            props: { targetDate }
        });

        // 1. Avanza el tiempo más allá de la fecha objetivo
        vi.advanceTimersByTime(6000); // 6 segundos

        // 2. Espera
        await wrapper.vm.$nextTick();

        // 3. Comprueba que la caja de la cuenta atrás ha desaparecido
        expect(wrapper.find('.timer-container').exists()).toBe(false);

        // 4. Comprueba que el mensaje está visible
        expect(wrapper.find('.finished-message').text()).toContain('¡El evento ha comenzado!');
    });
});
