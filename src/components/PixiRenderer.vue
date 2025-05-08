<template>
  <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as PIXI from 'pixi.js'
import { useResponsiveCanvas } from '../composables/useResponsiveCanvas'

const props = defineProps({
  backgroundColor: { type: Number, default: 0x1099bb },
  isAnimating: { type: Boolean, default: true },
})

const emit = defineEmits(['app-ready'])
const pixiContainer = ref(null)
let app = null

onMounted(() => {
  // Create the PIXI application
  app = new PIXI.Application({
    backgroundColor: props.backgroundColor,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    antialias: true,
  })

  // Add the canvas to the DOM
  pixiContainer.value.appendChild(app.view)

  // Make canvas responsive
  const { resize } = useResponsiveCanvas(app, pixiContainer)
  resize()

  // Signal that the app is ready
  emit('app-ready', app)
})

// Watch animation state
watch(
  () => props.isAnimating,
  (isAnimating) => {
    if (app) {
      app.ticker.started = isAnimating
    }
  },
)

// Clean up resources on unmount
onBeforeUnmount(() => {
  if (app) {
    app.destroy(true, true)
    app = null
  }
})

// Expose the PIXI app to parent components
defineExpose({ getApp: () => app })
</script>

<style>
.pixi-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
