<script setup lang="ts">
 import {computed, ref} from 'vue'


const idiomaPredefinido = ref(navigator.language)
const plataformaDelUsuario = ref(navigator.platform)
const cookieHablilitadas = ref(navigator.cookieEnabled)
</script>
<template>
  <div>
    <p>Idioma del navegador: {{ idiomaPredefinido }}</p>
    <p>Plataforma del usuario: {{ plataformaDelUsuario }}</p>
    <p>Estan las cookies habilitadas: {{ cookieHablilitadas }}</p>
  </div>
</template>