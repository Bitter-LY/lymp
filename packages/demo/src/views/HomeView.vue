<script setup lang="ts">
import { ref } from 'vue'
import { VViewer, VOverlayGroup, VMarker, type Viewer } from 'lymp'

const createPosition = () => [116.4, 39.91] as [number, number]

const visible = ref(true)
const handleViewerCreated = (viewer: Viewer) => {
  viewer.on('click', () => (visible.value = !visible.value))
}
</script>

<template>
  <VViewer style="width: 100vw; height: 100vh" @created="handleViewerCreated">
    <VOverlayGroup :visible="visible">
      <VMarker :options="{ position: createPosition() }" />
    </VOverlayGroup>
  </VViewer>

  <div style="position: fixed; left: 30px; top: 30px"></div>
</template>
