import { defineComponent, inject, type PropType, watchPostEffect } from 'vue'
import { Content } from '@lymp/core'
import {
  overlayGroupInjectionKey,
  setContentInjectionKey,
  viewerInjectionKey
} from '../injectionKeys'
import { call } from '../utils/vue/call'
import createLifeCycleProps from '../props/createLifeCycleProps'

const props = {
  options: [Object, undefined] as PropType<AMap.OverlayOptions | undefined>,
  ...createLifeCycleProps<Content>()
}

export default defineComponent({
  name: 'Content',
  props,
  setup(props) {
    const content = new Content(props.options)
    const viewer = inject(viewerInjectionKey, null)

    // #S with LabelMarker#slot: content
    const setContent = inject(setContentInjectionKey, null)
    if (setContent) return setContent(content)
    // #E with LabelMarker#slot: content

    const overlayGroup = inject(overlayGroupInjectionKey, null)
    if (overlayGroup) return overlayGroup.addOverlay(content)

    watchPostEffect(onClean => {
      onClean(() => {
        viewer?.value?.remove(content)
        handleDestroyed()
      })

      if (!viewer?.value) return
      viewer.value.add(content)
      handleMounted()
    })

    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted, content)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed, content)
    }
  },
  render() {
    return <i />
  }
})
