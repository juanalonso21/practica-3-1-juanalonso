import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApp } from 'vue';
import { useOnlineStatus } from '../../composables/useOnlineStatus'; 
function withSetup<T>(composable: () => T) {
  let result!: T;
  const app = createApp({
    setup() {
      result = composable();
      return () => {};
    },
  });
  app.mount(document.createElement('div'));
  return { result, app };
}

describe('useOnlineStatus', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Test de estado inicial: Debe inicializarse con el valor correcto de navigator.onLine', () => {
    const onLineSpy = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    const { result } = withSetup(() => useOnlineStatus());
    expect(result.isOnline.value).toBe(false);
    onLineSpy.mockReturnValue(true);
    const { result: resultTrue } = withSetup(() => useOnlineStatus());
    expect(resultTrue.isOnline.value).toBe(true);
  });

  it('Test de reactividad a eventos: Debe reaccionar a los eventos online y offline', () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const { result } = withSetup(() => useOnlineStatus());
    expect(result.isOnline.value).toBe(true);
    window.dispatchEvent(new Event('offline'));
    expect(result.isOnline.value).toBe(false);
    window.dispatchEvent(new Event('online'));
    expect(result.isOnline.value).toBe(true);
  });
});