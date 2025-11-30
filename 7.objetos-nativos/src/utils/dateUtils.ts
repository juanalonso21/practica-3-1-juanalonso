// Función auxiliar para comparar fechas [cite: 952]
export const isSameDay = (dateA: Date, dateB: Date): boolean => {
  return dateA.getFullYear() === dateB.getFullYear() &&
         dateA.getMonth() === dateB.getMonth() &&
         dateA.getDate() === dateB.getDate();
};