<template>
  <PixiRenderer
    :backgroundColor="0x1d2230"
    :isAnimating="isAnimating"
    @app-ready="onAppReady"
    ref="pixiRenderer"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import PixiRenderer from './PixiRenderer.vue'
import { usePixiSprite } from '../composables/usePixiSprite'
import { usePixiResources } from '../composables/usePixiResources'

const props = defineProps({
  isAnimating: { type: Boolean, default: true },
})

const emit = defineEmits(['sprites-updated'])

const pixiRenderer = ref(null)
let app = null
const bunnies = ref([])
const background = ref(null)

const onAppReady = (pixiApp) => {
  app = pixiApp

  // Setup resources management
  const { registerResource } = usePixiResources(app)

  // Load background first
  const { sprite: bgSprite, createSprite: createBgSprite } = usePixiSprite(app)
  background.value = createBgSprite('/assets/background.jpg')
  registerResource(background.value)

  if (background.value) {
    // Fit background to screen
    background.value.width = app.screen.width
    background.value.height = app.screen.height

    // Add ticker to update sprites
    app.ticker.add((delta) => {
      updateBunnies(delta)
    })

    // Add initial bunnies
    for (let i = 0; i < 5; i++) {
      addBunny()
    }
  }
}

// Add a new bunny sprite to the scene
const addBunny = () => {
  if (!app) return

  const { sprite: bunnySprite, createSprite: createBunnySprite } = usePixiSprite(app)
  const bunny = createBunnySprite('/assets/bunny.png')

  if (bunny) {
    // Set anchor point to center
    bunny.anchor.set(0.5)

    // Position randomly on screen
    bunny.x = Math.random() * app.screen.width
    bunny.y = Math.random() * app.screen.height

    // Add random velocity
    bunny.vx = (Math.random() - 0.5) * 5
    bunny.vy = (Math.random() - 0.5) * 5

    // Add to bunnies array
    bunnies.value.push(bunny)

    // Emit updated count
    emit('sprites-updated', bunnies.value.length)
  }

  return bunny
}

// Remove the last bunny sprite
const removeBunny = () => {
  if (bunnies.value.length > 0 && app) {
    const bunny = bunnies.value.pop()
    app.stage.removeChild(bunny)
    bunny.destroy()

    // Emit updated count
    emit('sprites-updated', bunnies.value.length)
  }
}

// Update bunny positions and rotations
const updateBunnies = (delta) => {
  bunnies.value.forEach((bunny) => {
    // Update position
    bunny.x += bunny.vx * delta
    bunny.y += bunny.vy * delta

    // Add a slight rotation
    bunny.rotation += 0.01 * delta

    // Bounce off edges
    if (bunny.x < 0 || bunny.x > app.screen.width) {
      bunny.vx *= -1
    }

    if (bunny.y < 0 || bunny.y > app.screen.height) {
      bunny.vy *= -1
    }
  })
}

// Watch screen resize to update background
watch(
  () => [app?.screen.width, app?.screen.height],
  ([newWidth, newHeight]) => {
    if (background.value && newWidth && newHeight) {
      background.value.width = newWidth
      background.value.height = newHeight
    }
  },
  { deep: true },
)

// Expose methods
defineExpose({ addBunny, removeBunny })
</script>
