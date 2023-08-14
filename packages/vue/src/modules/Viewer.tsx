import {
  defineComponent,
  shallowRef,
  type PropType,
  onMounted,
  onUnmounted,
  provide,
  renderSlot
} from 'vue'
import { Viewer } from '@lymp/core'
import style from '../styles/viewer.cssr'
import { namespace } from '../_utils/cssr'
import { viewerInjectionKey } from '../injectionKeys'
import { call, type MaybeArray } from '../_utils/vue/call'

const props = {
  options: Object as PropType<AMap.MapOptions | undefined>,
  onCreated: [Function, Array] as PropType<MaybeArray<(e: Viewer) => void>>,
  onMounted: [Function, Array] as PropType<MaybeArray<(e: Viewer) => void>>,
  onDestroyed: [Function, Array] as PropType<MaybeArray<(e: Viewer) => void>>
}

export default defineComponent({
  name: 'Viewer',
  props,
  setup(props) {
    const handleOnCreated = () => {
      if (!props.onCreated) return
      call(props.onCreated, viewer.value!)
    }
    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted, viewer.value!)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed, viewer.value!)
    }

    const viewer = shallowRef<Viewer | null>(null)
    const viewerContainer = shallowRef<HTMLDivElement | null>(null)
    provide(viewerInjectionKey, viewer)

    onMounted(() => {
      if (!viewerContainer.value) return
      style.mount({ id: 'viewerContainer' })
      viewer.value = new Viewer(viewerContainer.value, props.options)
      handleOnCreated()
      viewer.value.on('complete', () => handleMounted())
    })

    onUnmounted(() => {
      if (!viewer.value) return
      viewer.value.destroy()
      viewer.value = null
      handleDestroyed()
    })

    return {
      viewerContainer
    }
  },
  render() {
    return (
      <div
        ref="viewerContainer"
        id="viewerContainer"
        class={namespace + '-viewer'}
      >
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
