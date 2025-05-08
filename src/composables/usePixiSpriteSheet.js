export function usePixiSpriteSheet(app) {
  const loadSpriteSheet = async (sheetPath) => {
    return new Promise((resolve) => {
      app.loader.add(sheetPath).load((loader, resources) => {
        resolve(resources[sheetPath].spritesheet)
      })
    })
  }

  return { loadSpriteSheet }
}
