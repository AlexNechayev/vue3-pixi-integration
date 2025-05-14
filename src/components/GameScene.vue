<template>
  <PixiRenderer
    :backgroundColor="0x1d2230"
    :isAnimating="isAnimating"
    @app-ready="onAppReady"
    ref="pixiRenderer"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import PixiRenderer from './PixiRenderer.vue'
import { usePixiSprite } from '../composables/usePixiSprite'
import { usePixiResources } from '../composables/usePixiResources'

defineProps({
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
  const { createSprite: createBgSprite } = usePixiSprite(app)
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
      addSceneSprite()
    }
  }
}

// Add a new sprite sprite to the scene
const addSceneSprite = () => {
  if (!app) return

  const { createSprite: createSceneSprite } = usePixiSprite(app)
  const sprite = createSceneSprite('/assets/vue-logo.png')

  if (sprite) {
    // Set anchor point to center
    sprite.anchor.set(0.5)

    // Position randomly on screen
    sprite.x = Math.random() * app.screen.width
    sprite.y = Math.random() * app.screen.height

    // Add random velocity
    sprite.vx = (Math.random() - 0.5) * 5
    sprite.vy = (Math.random() - 0.5) * 5

    // Add to bunnies array
    bunnies.value.push(sprite)

    // Emit updated count
    emit('sprites-updated', bunnies.value.length)
  }

  return sprite
}

// Remove the last sprite sprite
const removeSceneSprite = () => {
  if (bunnies.value.length > 0 && app) {
    const sprite = bunnies.value.pop()
    app.stage.removeChild(sprite)
    sprite.destroy()

    // Emit updated count
    emit('sprites-updated', bunnies.value.length)
  }
}

// Update sprite positions and rotations
const updateBunnies = (delta) => {
  bunnies.value.forEach((sprite) => {
    // Update position
    sprite.x += sprite.vx * delta
    sprite.y += sprite.vy * delta

    // Add a slight rotation
    sprite.rotation += 0.01 * delta

    // Bounce off edges
    if (sprite.x < 0 || sprite.x > app.screen.width) {
      sprite.vx *= -1
    }

    if (sprite.y < 0 || sprite.y > app.screen.height) {
      sprite.vy *= -1
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
defineExpose({ addSceneSprite, removeSceneSprite })
</script>
