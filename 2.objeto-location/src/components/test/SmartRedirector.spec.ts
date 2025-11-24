import { describe, it, expect, vi, beforeEach, afterEach, type Mock, type MockInstance } from 'vitest';
import { mount } from '@vue/test-utils';
import SmartRedirector from '../SmartRedirector.vue';

describe('SmartRedirector.vue', () => {
  vi.stubGlobal('import.meta', { env: { DEV: false } });

  let assignMock: Mock;
  let hrefSetter: Mock;
  let userAgentSpy: MockInstance;

  beforeEach(() => {
    assignMock = vi.fn();
    hrefSetter = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe redirigir a HTTPS si el protocolo es HTTP', () => {
    let currentHref = 'http://mi-sitio.com/test';
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        protocol: 'http:',
        get href() { return currentHref; },
        set href(v: string) {
          currentHref = v;
          hrefSetter(v);
        },
        assign: assignMock,
      }
    });

    mount(SmartRedirector);
    expect(hrefSetter).toHaveBeenCalledWith('https://mi-sitio.com/test');
    expect(assignMock).not.toHaveBeenCalled();
  });

  it('debe redirigir a /pagina-para-firefox si el navegador es Firefox', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { protocol: 'https:', href: 'https://mi-sitio.com', assign: assignMock }
    });
    userAgentSpy = vi.spyOn(navigator, 'userAgent', 'get');
    userAgentSpy.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0');

    mount(SmartRedirector);
    expect(assignMock).toHaveBeenCalledWith('/pagina-para-firefox');
  });

  it('debe redirigir a /pagina-para-chrome si el navegador es Chrome (y no Edge)', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { protocol: 'https:', href: 'https://mi-sitio.com', assign: assignMock }
    });
    userAgentSpy = vi.spyOn(navigator, 'userAgent', 'get');
    userAgentSpy.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36');

    mount(SmartRedirector);
    expect(assignMock).toHaveBeenCalledWith('/pagina-para-chrome');
  });

  it('no debe redirigir si ya está en HTTPS y el navegador no es Firefox ni Chrome', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { protocol: 'https:', href: 'https://mi-sitio.com', assign: assignMock }
    });
    userAgentSpy = vi.spyOn(navigator, 'userAgent', 'get');
    userAgentSpy.mockReturnValue('Safari/5.0');

    mount(SmartRedirector);
    expect(assignMock).not.toHaveBeenCalled();
  });
});