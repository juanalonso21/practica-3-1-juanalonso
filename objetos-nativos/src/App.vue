<script setup lang="ts">
import ProductPrice from './components/ProductPrice.vue';
import SearchFilter from './components/SearchFilter.vue';
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
