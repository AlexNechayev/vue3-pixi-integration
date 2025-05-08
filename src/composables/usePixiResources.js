import { ref, onUnmounted } from 'vue'

export function usePixiResources(app) {
  const resources = ref([])

  const registerResource = (resource) => {
    // For resources that need to be added to the stage
    if (resource && !resource.parent && app) {
      app.stage.addChild(resource)
    }

    resources.value.push(resource)
    return resource
  }

  onUnmounted(() => {
    resources.value.forEach((resource) => {
      // Remove from stage if applicable
      if (resource && resource.parent) {
        resource.parent.removeChild(resource)
      }

      // Destroy the resource
      if (resource && typeof resource.destroy === 'function') {
        resource.destroy(true)
      }
    })
    resources.value = []
  })

  return { registerResource }
}
