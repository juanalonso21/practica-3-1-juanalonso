<template>
  <div class="dropdown-container">
    <button @click.stop="toggleMenu" class="trigger-btn">
      {{ isOpen ? 'Cerrar Menú' : 'Abrir Menú' }}
    </button>

    <div v-if="isOpen" ref="menuRef" class="menu-content">
      <ul>
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Configuración</a></li>
        <li><a href="#">Cerrar Sesión</a></li>
      </ul>
    </div>
    
    <p class="hint">Haz clic fuera del recuadro gris para cerrarlo.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Importamos nuestro composable
import { useClickOutside } from '@/composables/useClickOutside';

// Estado del menú
const isOpen = ref(false);

// Template Ref (inicialmente null, Vue lo rellena al montar el DOM)
const menuRef = ref<HTMLElement | null>(null);

// Función para alternar
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// IMPLEMENTACIÓN DEL COMPOSABLE
// Le pasamos la referencia del menú y la acción a realizar (cerrar)
useClickOutside(menuRef, () => {
  if (isOpen.value) {
    console.log('Clic detectado fuera del menú. Cerrando...');
    isOpen.value = false;
  }
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
  padding: 20px;
}

.trigger-btn {
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.menu-content {
  margin-top: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 200px;
  /* Posición absoluta si quieres que flote, relativa para el ejemplo */
  position: absolute; 
  z-index: 10;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}

li:last-child {
  margin-bottom: 0;
}

a {
  text-decoration: none;
  color: #333;
  display: block;
}

a:hover {
  color: #42b883;
}

.hint {
  margin-top: 150px; /* Espacio para que no tape el texto */
  color: #666;
  font-style: italic;
}
</style>