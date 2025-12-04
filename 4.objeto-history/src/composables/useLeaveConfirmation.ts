import { watchEffect, onUnmounted, type Ref } from 'vue'

export function useLeaveConfirmation(hasUnsavedChanges: Ref<boolean>) {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (hasUnsavedChanges.value) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  watchEffect((onCleanup) => {
    if (hasUnsavedChanges.value) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
    onCleanup(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })
  })

  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
}
