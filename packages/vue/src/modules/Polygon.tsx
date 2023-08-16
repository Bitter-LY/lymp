import { defineComponent, inject, type PropType, watchPostEffect } from 'vue'
import { Polygon } from '@lymp/core'
import { overlayGroupInjectionKey, viewerInjectionKey } from '../injectionKeys'
import { call } from '../utils/vue/call'
import createLifeCycleProps from '../props/createLifeCycleProps'

const props = {
  options: [Object, undefined] as PropType<AMap.PolygonOptions | undefined>,
  ...createLifeCycleProps<Polygon>()
}

export default defineComponent({
  name: 'Polygon',
  props,
  setup(props) {
    const polygon = new Polygon(props.options)
    const viewer = inject(viewerInjectionKey, null)

    const overlayGroup = inject(overlayGroupInjectionKey, null)
    if (overlayGroup) return overlayGroup.addOverlay(polygon)

    watchPostEffect(onClean => {
      if (!viewer?.value) return
      onClean(() => {
        viewer?.value?.remove(polygon)
        handleDestroyed()
      })

      viewer.value.add(polygon)
      handleMounted()
    })

    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted, polygon)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed, polygon)
    }
  },
  render() {
    return <i />
  }
})
