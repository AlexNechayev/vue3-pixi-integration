<template>
  <div class="app-container">
    <header>
      <h1>Vue 3 + PIXI.js Integration</h1>
      <div class="controls">
        <button @click="toggleAnimation">{{ isAnimating ? 'Pause' : 'Play' }}</button>
        <button @click="addSprite">Add Sprite</button>
        <button @click="removeSprite">Remove Sprite</button>
      </div>
    </header>
    <main>
      <GameScene ref="gameScene" :isAnimating="isAnimating" @sprites-updated="onSpritesUpdated" />
    </main>
    <footer>
      <p>Sprites Count: {{ spritesCount }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameScene from './components/GameScene.vue'

const gameScene = ref(null)
const isAnimating = ref(true)
const spritesCount = ref(0)

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value
}

const addSprite = () => {
  gameScene.value?.addBunny()
}

const removeSprite = () => {
  gameScene.value?.removeBunny()
}

const onSpritesUpdated = (count) => {
  spritesCount.value = count
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  gap: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 8px;
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #45a049;
}

main {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

footer {
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 8px;
  text-align: center;
}
</style>
