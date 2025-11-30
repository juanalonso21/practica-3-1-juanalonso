<template>
  <div class="product-price">
    <span class="label">Precio:</span>
    <span class="amount">{{ formattedPrice }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter.ts';

// Definición de Props
interface Props {
  price: number;
  locale: string; // Ej: 'es-ES', 'en-US'
  currencyCode: string; // Ej: 'EUR', 'USD'
}

const props = defineProps<Props>();

// Usamos el composable
const { formatCurrency } = useCurrencyFormatter();

// 3. Propiedad Computada
// Es importante usar computed para que si el precio cambia, 
// el formato se actualice automáticamente.
const formattedPrice = computed(() => {
  if (props.price === undefined || props.price === null) return '-';
  
  return formatCurrency(props.price, props.locale, props.currencyCode);
});
</script>

<style scoped>
.product-price {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 4px;
  display: inline-block;
}

.label {
  margin-right: 8px;
  color: #666;
}

.amount {
  font-weight: bold;
  color: #2c3e50;
}
</style>