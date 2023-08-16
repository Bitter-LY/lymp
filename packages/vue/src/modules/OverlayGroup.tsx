import {
  defineComponent,
  inject,
  type PropType,
  watchEffect,
  toRefs,
  provide,
  ref
} from 'vue'
import { OverlayGroup } from '@lymp/core'
import {
  viewerInjectionKey,
  overlayGroupHandlerInjectionKey
} from '../injectionKeys'
import { call, type MaybeArray } from '../_utils/vue/call'

const props = {
  visible: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  onCreated: [Function, Array] as PropType<MaybeArray<() => void>>,
  onMounted: [Function, Array] as PropType<MaybeArray<() => void>>,
  onDestroyed: [Function, Array] as PropType<MaybeArray<() => void>>
}

export default defineComponent({
  name: 'OverlayGroup',
  props,
  setup(props) {
    const handleOnCreated = () => {
      if (!props.onCreated) return
      call(props.onCreated)
    }
    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed)
    }

    const overlayGroup = new OverlayGroup()
    const overlayGroupHasViewer = ref(false)
    provide(overlayGroupHandlerInjectionKey, {
      add(item) {
        overlayGroup.addOverlay(item)
      },
      remove(item) {
        overlayGroup.removeOverlay(item)
      },
      hasViewer: overlayGroupHasViewer
    })
    handleOnCreated()

    const propsRefs = toRefs(props)
    watchEffect(() => {
      if (!propsRefs.visible.value) {
        overlayGroup.hide()
      } else {
        overlayGroup.show()
      }
    })

    const viewer = inject(viewerInjectionKey, null)
    watchEffect(onClean => {
      if (viewer?.value) {
        overlayGroup.setViewer(viewer.value)
        overlayGroupHasViewer.value = true
        handleMounted()
      }

      onClean(() => {
        overlayGroup.clearOverlays()
        handleDestroyed()
      })
    })
  },
  render() {
    return <div>{this.$slots.default?.()}</div>
  }
})
