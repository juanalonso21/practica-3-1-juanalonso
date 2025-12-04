<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLeaveConfirmation } from '@/composables/useLeaveConfirmation'

const editedContent = ref<string>('')
const originalContent = ref<string>('')
const hasUnsavedChanges = computed(() => editedContent.value !== originalContent.value)

useLeaveConfirmation(hasUnsavedChanges)

const saveChanges = () => {
  originalContent.value = editedContent.value
}
</script>

<template>
  <div class="unsaved-form">
    <textarea v-model="editedContent" placeholder="Escribe aquí..." rows="6" class="textarea"></textarea>
    <button class="save-btn" @click="saveChanges">Guardar</button>
    <p v-if="hasUnsavedChanges" class="warning">Tienes cambios sin guardar.</p>
  </div>
</template>

<style scoped>
.unsaved-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background-color: #222;
  border: 1px solid #555;
}

.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #666;
  resize: vertical;
  font-size: 16px;
  background: #333;
  color: #fff;
}

.save-btn {
  align-self: flex-start;
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  border: 1px solid #1e7e34;
  cursor: pointer;
}

.warning {
  color: #ff6b6b;
  font-weight: bold;
}
</style>
