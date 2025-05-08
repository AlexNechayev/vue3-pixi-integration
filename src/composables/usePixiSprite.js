import { ref, onUnmounted } from 'vue'
import * as PIXI from 'pixi.js'

export function usePixiSprite(app, texturePath = null) {
  const sprite = ref(null)

  const createSprite = (path = texturePath) => {
    if (!app) return null

    const texture = PIXI.Texture.from(path)
    sprite.value = new PIXI.Sprite(texture)
    app.stage.addChild(sprite.value)

    return sprite.value
  }

  const removeSprite = () => {
    if (sprite.value && app) {
      app.stage.removeChild(sprite.value)
      sprite.value.destroy()
      sprite.value = null
    }
  }

  onUnmounted(() => {
    removeSprite()
  })

  return {
    sprite,
    createSprite,
    removeSprite,
  }
}
