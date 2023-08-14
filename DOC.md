# @lymp/core

### Viewer
```typescript
import { Viewer } from 'lymp'

const viewer = new Viewer(container: string | HTMLDivElement, options?: AMap.MapOptions)
```

### Marker
```typescript
import { Marker } from 'lymp'

const marker = new Marker(options?: AMap.MarkerOptions)
```

### LabelMarker
```typescript
import { LabelMarker } from 'lymp'

const labelMarker = new LabelMarker(options: AMap.LabelMarkerOptions)
```

### Icon
```typescript
import { Icon } from 'lymp'

const icon = new Icon(options: AMap.IconOpts)
```

### Content
```typescript
import { Content } from 'lymp'

const content = new Content(options?: AMap.OverlayOptions)
```

### PulseLineLayer
```typescript
import { PulseLineLayer } from 'lymp'

const pulseLineLayer = new PulseLineLayer(options: Loca.PulseLineLayerOptions)
```
> Extends methods:
```typescript
on(type: AMapEventType, viewer: Viewer, callback: PulseLineLayerListener):void

off(type: AMapEventType, viewer: Viewer, callback: PulseLineLayerListener):void
```

# @lymp/vue

## Warn
> `v-show/if`控制显示隐藏的功能在后续版本中考虑废弃!!!

## Props
```typescript
type Props<T, O> = {
    options: Object as PropType<O | undefined>
    onCreated: [Function, Array] as PropType<MaybeArray<(e: T) => void>>
    onMounted: [Function, Array] as PropType<MaybeArray<(e: T) => void>>
    onDestroyed: [Function, Array] as PropType<MaybeArray<(e: T) => void>>
}
```

### VViewer
```typescript
<script setup lang="ts">
import { VViewer } from 'lymp'

const options: AMap.MapOptions = {
    center: [116.397428, 39.90923],
}
</script>

<template>
    <VViewer :options="options" />
</template>
```

### VMarker
```typescript
<script setup lang="ts">
import { VMarker, VViewer } from 'lymp'

const visible = ref(false)
const options: AMap.MarkerOptions = {
    position: [116.397428, 39.90923],
}
</script>

<template>
<VViewer>
    <VMarker v-show/if="visible" :options="options" />
</VViewer>
</template>
```

### VContent
```typescript
<script setup lang="ts">
import { VContent, VViewer } from 'lymp'

const visible = ref(false)
const options: AMap.OverlayOptions = {
    position: [116.397428, 39.90923],
    content: 'Hello World',
}
</script>

<template>
<VViewer>
    <VContent v-show/if="visible" :options="options" />
</VViewer>
</template>
```

### VLabelMarker
```typescript
<script setup lang="ts">
import { VLabelMarker, VContent, VViewer } from 'lymp'

const visible = ref(false)
const options: AMap.LabelMarkerOptions = {
    position: [116.397428, 39.90923],
    text: {
        content: 'Hello World',
    }
}
const contentOptions: AMap.OverlayOptions = {
    position: options.position,
    content: 'Hello World',
}
</script>

<template>
<VViewer>
    <VLabelMarker v-show/if="visible" :options="options" />
</VViewer>
</template>

// slot: content; 
// click labelMarker toggle content visible
<template>
<VViewer>
    <VLabelMarker v-show/if="visible" :options="options">
        <template #content>
            <VContent :options="contentOptions" />
        </template>
    </VLabelMarker>
</VViewer>
</template>
```

# Types

### PulseLineLayerListener
```typescript
type PulseLineLayerListener = (event: AMapEvent<Viewer>, feature: any) => void
```

### AMapEventType
```typescript
type AMapEventType =
   | 'resize'
   | 'complete'
   | 'click'
   | 'dblclick'
   | 'mapmove'
   | 'hotspotclick'
   | 'hotspotover'
   | 'hotspotout'
   | 'movestart'
   | 'moveend'
   | 'zoomchange'
   | 'zoomstart'
   | 'zoomend'
   | 'rotatechange'
   | 'rotatestart'
   | 'rotatestart'
   | 'mousemove'
   | 'mousewheel'
   | 'mouseover'
   | 'mouseout'
   | 'mouseup'
   | 'mousedown'
   | 'rightclick'
   | 'dragstart'
   | 'dragging'
   | 'dragend'
   | 'touchstart'
   | 'touchmove'
   | 'touchend'
```

### AMapEvent
```typescript 
type AMapEvent<T = any> = {
    lnglat: AMap.LngLat
    pixel: AMap.Pixel
    type: AMapEventType
    target: T
    pos: AMap.Vector2
    originalEvent: MouseEvent
}
```