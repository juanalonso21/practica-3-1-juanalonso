/**
 * Composable para formatear divisas utilizando la API Intl.NumberFormat.
 */
export function useCurrencyFormatter() {
  
  /**
   * Formatea un número según el local y la moneda especificados.
   * @param amount - El número a formatear (ej: 1234.56)
   * @param locale - El código local (ej: 'en-US', 'es-ES')
   * @param currencyCode - El código ISO de la moneda (ej: 'USD', 'EUR')
   * @returns String formateado
   */
  const formatCurrency = (amount: number, locale: string, currencyCode: string): string => {
    // Creamos la instancia del formateador
    // Intl es un objeto nativo de JavaScript, muy optimizado
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      // Opcional: podemos controlar decimales si fuera necesario, 
      // pero el default de la moneda suele ser el correcto.
    }).format(amount);
  };

  return {
    formatCurrency
  };
}   