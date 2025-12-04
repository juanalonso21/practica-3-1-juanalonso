<script setup lang="ts">
import { ref, onMounted } from 'vue'

const activeTab = ref<string>('perfil')

const changeTab = (tabName: string) => {
  activeTab.value = tabName
  const state = { tab: tabName }
  const newUrl = `/settings/${tabName}`
  history.pushState(state, '', newUrl)
}

onMounted(() => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  const last = parts[parts.length - 1] ?? 'perfil' 
  if (['perfil', 'facturacion', 'seguridad'].includes(last)) {
    activeTab.value = last
  }
})


</script>

<template>
  <div class="tab-navigator">
    <nav class="tabs">
      <button class="tab" :class="{ active: activeTab === 'perfil' }" @click="changeTab('perfil')">Perfil</button>
      <button class="tab" :class="{ active: activeTab === 'facturacion' }" @click="changeTab('facturacion')">Facturación</button>
      <button class="tab" :class="{ active: activeTab === 'seguridad' }" @click="changeTab('seguridad')">Seguridad</button>
    </nav>
    <section class="content">
      <div v-if="activeTab === 'perfil'" class="tab-content">Contenido del Perfil</div>
      <div v-else-if="activeTab === 'facturacion'" class="tab-content">Contenido de Facturación</div>
      <div v-else class="tab-content">Contenido de Seguridad</div>
    </section>
  </div>
</template>

<style scoped>
.tab-navigator {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  border: 1px solid #555;
  background-color: #222;
}

.tabs {
  display: flex;
  gap: 10px;
}

.tab {
  padding: 10px 15px;
  background-color: #444;
  color: #fff;
  border: 1px solid #666;
  border-radius: 0;
  cursor: pointer;
}

.tab.active {
  background-color: #005a9e;
  border-color: #003f6e;
}

.content {
  padding: 15px;
  background: #333;
  color: #fff;
}
</style>
