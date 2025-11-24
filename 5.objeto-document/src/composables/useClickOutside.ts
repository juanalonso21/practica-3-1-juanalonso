import { onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Detecta clics fuera de un elemento específico.
 * @param elementRef - Referencia reactiva al elemento del DOM a vigilar.
 * @param callback - Función a ejecutar cuando se hace clic fuera.
 */
export function useClickOutside(
  elementRef: Ref<HTMLElement | null>, 
  callback: () => void
) {
  // Handler del evento
  const handleClick = (event: Event) => {
    // 1. Comprobamos que el elemento ref tenga valor (esté montado en el DOM)
    // 2. Comprobamos que el objetivo del evento sea un Nodo del DOM válido
    if (!elementRef.value || !(event.target instanceof Node)) {
      return;
    }

    // 3. La lógica clave: ¿El elemento contiene al target del clic?
    // Si NO lo contiene (!), significa que fue un clic fuera.
    if (!elementRef.value.contains(event.target)) {
      callback();
    }
  };

  // Ciclo de vida: Montaje
  onMounted(() => {
    // Registramos el listener en el objeto global document
    document.addEventListener('click', handleClick);
  });

  // Ciclo de vida: Desmontaje
  onUnmounted(() => {
    // Limpieza obligatoria para evitar fugas de memoria
    document.removeEventListener('click', handleClick);
  });
}