import { viewerInjectionKey, contentInjectionKey } from '../injectionKeys'
import {
  defineComponent,
  inject,
  type PropType,
  watchEffect,
  ref,
  onUpdated,
  provide,
  shallowRef
} from 'vue'
import { LabelMarker, type Content } from '@lymp/core'
import { call, type MaybeArray } from '../_utils/vue/call'

const props = {
  onCreated: [Function, Array] as PropType<
    MaybeArray<(e: LabelMarker) => void>
  >,
  onMounted: [Function, Array] as PropType<
    MaybeArray<(e: LabelMarker) => void>
  >,
  onDestroyed: [Function, Array] as PropType<
    MaybeArray<(e: LabelMarker) => void>
  >
}

export default defineComponent({
  name: 'LabelMarker',
  props: {
    ...props,
    options: {
      type: Object as PropType<AMap.LabelMarkerOptions>,
      required: true
    }
  },
  setup(props) {
    const handleOnCreated = () => {
      if (!props.onCreated) return
      call(props.onCreated, labelMarker)
    }
    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted, labelMarker)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed, labelMarker)
    }

    const self = ref<HTMLDivElement | null>(null)
    const labelMarker = new LabelMarker(props.options)
    handleOnCreated()

    // 兼容`v-show`以及直接修改`style.display`属性
    onUpdated(() => {
      if (!self.value) return
      const display = self.value.style.display
      if (display === 'none') {
        labelMarker.hide()
      } else {
        labelMarker.show()
      }
    })

    const viewer = inject(viewerInjectionKey, null)
    watchEffect(onClean => {
      if (viewer?.value) {
        viewer.value.add(labelMarker)
        handleMounted()
      }

      onClean(() => {
        if (viewer?.value) viewer.value.remove(labelMarker)
        handleDestroyed()
      })
    })

    // slot content
    const contentIns = shallowRef<Content | null>(null)
    provide(contentInjectionKey, contentIns)
    const toggleContentVisible = () => {
      if (!contentIns.value) return
      const visible = contentIns.value.getVisible()
      if (visible) return contentIns.value.hide()
      contentIns.value.show()
    }

    return {
      self,
      labelMarker,
      contentIns,
      toggleContentVisible
    }
  },
  render() {
    if (this.contentIns) {
      this.labelMarker.on('click', this.toggleContentVisible)
    } else {
      this.labelMarker.off('click', this.toggleContentVisible)
    }

    return <div ref="self">{this.$slots.content?.()}</div>
  }
})
