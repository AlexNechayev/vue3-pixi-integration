// README.md

# Vue 3 + PIXI.js Application

This project demonstrates the integration of PIXI.js with Vue 3 using the Composition API.

## Project Setup

```bash
# Install dependencies
npm install

# Serve for development
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Features

- Responsive PIXI.js canvas
- Sprite management with Vue 3 Composition API
- Animation control
- Dynamic sprite addition/removal
- Resource management to prevent memory leaks

## Project Structure

- `components/`: Vue components
  - `PixiRenderer.vue`: Base component for PIXI.js rendering
  - `GameScene.vue`: Game scene implementation
- `composables/`: Reusable Vue composition functions
  - `usePixiSprite.js`: For sprite management
  - `usePixiResources.js`: For resource cleanup
  - `useResponsiveCanvas.js`: For responsive canvas handling
