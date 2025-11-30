import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BrowserInfo from '../BrowserInfo.vue';

describe('BrowserInfo.vue', () => {
    it('renders browser info correctly', () => {
        // Mock navigator properties
        const languageSpy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');
        const platformSpy = vi.spyOn(navigator, 'platform', 'get').mockReturnValue('Win32');
        const cookieEnabledSpy = vi.spyOn(navigator, 'cookieEnabled', 'get').mockReturnValue(true);

        const wrapper = mount(BrowserInfo);

        expect(wrapper.text()).toContain('Idioma del navegador: es-ES');
        expect(wrapper.text()).toContain('Plataforma del usuario: Win32');
        expect(wrapper.text()).toContain('Estan las cookies habilitadas: true');

        // Restore mocks
        languageSpy.mockRestore();
        platformSpy.mockRestore();
        cookieEnabledSpy.mockRestore();
    });
});
