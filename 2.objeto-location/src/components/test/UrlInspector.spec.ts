import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import UrlInspector from '../UrlInspector.vue';

describe('UrlInspector.vue', () => {
  let originalLocation: any;

  beforeEach(() => {
    originalLocation = window.location;
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.restoreAllMocks();
  });

  it('debe mostrar las partes de una URL simulada', async () => {
    const mockLocation = {
      href: 'https://www.vuejs.org/guide/essentials/list.html?query=test',
      protocol: 'https:',
      hostname: 'www.vuejs.org',
      port: '',
      pathname: '/guide/essentials/list.html',
      search: '?query=test'
    };

    delete (window as any).location;
    window.location = {
      ...originalLocation,
      href: mockLocation.href,
      protocol: mockLocation.protocol,
      hostname: mockLocation.hostname,
      port: mockLocation.port,
      pathname: mockLocation.pathname,
      search: mockLocation.search,
    } as any;

    const wrapper = mount(UrlInspector);
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain(mockLocation.href);
    expect(wrapper.text()).toContain(mockLocation.protocol);
    expect(wrapper.text()).toContain(mockLocation.hostname);
    expect(wrapper.text()).toContain(mockLocation.pathname);
    expect(wrapper.text()).toContain(mockLocation.search);
  });
});