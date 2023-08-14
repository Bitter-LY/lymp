import {
  defineComponent,
  inject,
  type PropType,
  watchEffect,
  ref,
  onUpdated
} from 'vue'
import { Marker } from '@lymp/core'
import { viewerInjectionKey } from '../injectionKeys'
import { call, type MaybeArray } from '../_utils/vue/call'

const props = {
  options: [Object, undefined] as PropType<AMap.MarkerOptions | undefined>,
  onCreated: [Function, Array] as PropType<MaybeArray<(e: Marker) => void>>,
  onMounted: [Function, Array] as PropType<MaybeArray<(e: Marker) => void>>,
  onDestroyed: [Function, Array] as PropType<MaybeArray<(e: Marker) => void>>
}

export default defineComponent({
  name: 'Marker',
  props,
  setup(props) {
    const handleOnCreated = () => {
      if (!props.onCreated) return
      call(props.onCreated, marker)
    }
    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted, marker)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed, marker)
    }

    const self = ref<HTMLDivElement | null>(null)
    const marker = new Marker(props.options)
    handleOnCreated()

    // 兼容`v-show`以及直接修改`style.display`属性
    onUpdated(() => {
      if (!self.value) return
      const display = self.value.style.display
      if (display === 'none') {
        marker.hide()
      } else {
        marker.show()
      }
    })

    const viewer = inject(viewerInjectionKey, null)
    watchEffect(onClean => {
      if (viewer?.value) {
        viewer.value.add(marker)
        handleMounted()
      }

      onClean(() => {
        if (viewer?.value) viewer.value.remove(marker)
        marker.destroy()
        handleDestroyed()
      })
    })

    return {
      self
    }
  },
  render() {
    return <div ref="self"></div>
  }
})
