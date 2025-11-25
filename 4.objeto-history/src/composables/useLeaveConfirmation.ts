import { watchEffect, onUnmounted, type Ref } from 'vue'

export function useLeaveConfirmation(hasUnsavedChanges: Ref<boolean>) {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (hasUnsavedChanges.value) {
      event.preventDefault()
      event.returnValue = ''
    }
  }

  // Watch the ref and add/remove the listener accordingly.
  watchEffect((onCleanup) => {
    if (hasUnsavedChanges.value) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }
    // Cleanup when the condition changes or component unmounts.
    onCleanup(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    })
  })

  // Ensure cleanup on component unmount in case the ref never toggles.
  onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
}
