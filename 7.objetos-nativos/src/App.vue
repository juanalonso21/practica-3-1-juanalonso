<script setup lang="ts">
import CalendarView from './components/CalendarView.vue';
import CountdownTimer from './components/CountdownTimer.vue';
import Ejercicio75 from './components/Ejercicio7-5.vue';
import ProductPrice from './components/ProductPrice.vue';
import SearchFilter from './components/SearchFilter.vue';
import * as p from './utils/ejercicioArrays';

const solutions = [
  { id: 1, description: 'Ordena el array de menor a mayor por precio', data: p.sortByPrice() },
  { id: 2, description: 'Ordena el array de menor a mayor por fechaIngreso', data: p.sortByDate() },
  { id: 3, description: 'Selecciona los artículos que tiene un precio inferior a 25', data: p.filterCheap() },
  { id: 4, description: 'Porcentaje de Stock de cada producto', data: p.stockPercentage() },
  { id: 5, description: 'Agrupa los artículos por categoría', data: p.groupByCategory() },
  { id: 6, description: 'Muestra los 3 productos más caros', data: p.top3Expensive() },
  { id: 7, description: 'Ganancias si vendemos todos los accesorios', data: p.earningsAccessories() },
  { id: 8, description: 'Productos ingresados en los últimos 15 días (Ref: 2024-11-15)', data: p.recentProducts() },
  { id: 9, description: 'Calzado con precio entre 20 y 30', data: p.footwearFilter() },
  { id: 10, description: 'Agrega un nuevo producto', data: p.addProduct() },
  { id: 11, description: 'Descuento del 5% a los 5 productos con mayor stock', data: p.discountHighStock() },
  { id: 12, description: 'Borra los productos del mes de octubre', data: p.deleteOctober() },
];
</script>

<template>
  <SearchFilter :items="[
    { id: 1, name: 'Object 1' },
    { id: 2, name: 'Objeto 2' },
    { id: 3, name: 'Objeto 3' },
    { id: 4, name: 'Objeto 4' },
    { id: 5, name: 'Objeto 5' }
  ]"/>
  <ProductPrice :price="199.99" locale="es-ES" currencyCode="EUR"/>
  <CountdownTimer :targetDate="new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)"/>
  <CalendarView
    :year="2024"
    :month="5"
    :events="[
      { date: new Date(2024, 5, 10), title: 'Reunión', type: 'busy' },
      { date: new Date(2024, 5, 15), title: 'Vacaciones', type: 'holiday' },
      { date: new Date(2024, 5, 20), title: 'Cita médica', type: 'tentative' }
    ]"/>
    <Ejercicio75 title="Ejercicio 7.5: Productos" :solutions="solutions"/>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
