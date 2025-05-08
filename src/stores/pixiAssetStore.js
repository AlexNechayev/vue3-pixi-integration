import { defineStore } from 'pinia'

export const usePixiAssetStore = defineStore('pixiAssets', {
  state: () => ({
    loadedAssets: {},
    isLoading: false,
    progress: 0,
  }),

  actions: {
    async loadAssets(assets) {
      this.isLoading = true
      this.progress = 0

      // Implementation of asset loading logic

      this.isLoading = false
      this.progress = 100
    },
  },
})
