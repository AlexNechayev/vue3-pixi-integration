import { onMounted, onUnmounted } from 'vue'

export function useResponsiveCanvas(app, containerRef) {
  const resize = () => {
    if (!app || !containerRef.value) return

    const parent = containerRef.value
    app.renderer.resize(parent.clientWidth, parent.clientHeight)
  }

  onMounted(() => {
    window.addEventListener('resize', resize)
    resize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })

  return { resize }
}
