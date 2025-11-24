<script setup lang="ts">
import { useWindowSize } from '@/composables/useWindowSize'

const { width, height } = useWindowSize()
</script>

<template>
  <div>
    <p>Ancho: {{ width }}px - Alto: {{ height }}px</p>
  </div>
</template>
