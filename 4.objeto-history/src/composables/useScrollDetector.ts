import { onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollDetector(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void,
  buffer = 100,
) {
  const onScroll = () => {
    const el = elementRef.value
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    if (scrollHeight - scrollTop <= clientHeight + buffer) {
      callback()
    }
  }

  onMounted(() => {
    const el = elementRef.value
    if (el) {
      el.addEventListener('scroll', onScroll)
    }
  })

  onUnmounted(() => {
    const el = elementRef.value
    if (el) {
      el.removeEventListener('scroll', onScroll)
    }
  })
}
