<script setup lang="ts">
import { Marker, VViewer, type Viewer, OverlayGroup } from 'lymp'

const overlayGroup = new OverlayGroup()

const handleMounted = (viewer: Viewer) => {
  overlayGroup.setViewer(viewer)
}

let visible = true
const handleToggle = () => {
  if (visible) {
    overlayGroup.hide()
  } else {
    overlayGroup.show()
  }
  visible = !visible
}

let marker: Marker
let uid = 0
const handleAddOverlay = () => {
  marker = new Marker({
    position: [116.4 + Math.random() * 0.1, 39.91 + Math.random() * 0.1],
    extData: {
      id: ++uid
    }
  })
  overlayGroup.addOverlay(marker)
}
const handleRemoveOverlay = () => {
  overlayGroup.removeOverlay(marker)
}

const handleAddOverlays = () => {
  overlayGroup.addOverlays(
    Array.from({ length: 10 }).map(() => {
      return new Marker({
        position: [116.4 + Math.random() * 0.1, 39.91 + Math.random() * 0.1]
      })
    })
  )
}

const handleHasOverlay = () => {
  console.log(overlayGroup.hasOverlay(marker))
}
</script>

<template>
  <VViewer style="width: 100vw; height: 100vh" @mounted="handleMounted" />

  <div style="position: fixed; left: 30px; top: 30px">
    <button @click="handleToggle">TOGGLE</button>
    <button @click="handleAddOverlay">ADD</button>
    <button @click="handleAddOverlays">ADDs</button>
    <button @click="handleHasOverlay">HAS</button>
    <button @click="handleRemoveOverlay">REMOVE</button>
    <button @click="() => overlayGroup.clearOverlays()">CLEAR</button>
  </div>
</template>
