import { viewerInjectionKey, contentInjectionKey } from '../injectionKeys'
import {
  defineComponent,
  inject,
  type PropType,
  watchEffect,
  ref,
  onUpdated,
  nextTick
} from 'vue'
import { Content } from '@lymp/core'
import { call, type MaybeArray } from '../_utils/vue/call'

const props = {
  options: [Object, undefined] as PropType<AMap.OverlayOptions | undefined>,
  onCreated: [Function, Array] as PropType<MaybeArray<(e: Content) => void>>,
  onMounted: [Function, Array] as PropType<MaybeArray<(e: Content) => void>>,
  onDestroyed: [Function, Array] as PropType<MaybeArray<(e: Content) => void>>
}

export default defineComponent({
  name: 'Content',
  props,
  setup(props) {
    const handleOnCreated = () => {
      if (!props.onCreated) return
      call(props.onCreated, content)
    }
    const handleMounted = () => {
      if (!props.onMounted) return
      call(props.onMounted, content)
    }
    const handleDestroyed = () => {
      if (!props.onDestroyed) return
      call(props.onDestroyed, content)
    }

    const self = ref<HTMLDivElement | null>(null)
    const content = new Content(props.options)
    handleOnCreated()

    const contentIns = inject(contentInjectionKey, null)
    if (contentIns) contentIns.value = content

    if (!contentIns) {
      // 兼容`v-show`以及直接修改`style.display`属性
      onUpdated(() => {
        if (!self.value) return
        const display = self.value.style.display
        if (display === 'none') {
          content.hide()
        } else {
          content.show()
        }
      })
    } else {
      onUpdated(() => {
        nextTick(() => {
          if (!self.value) return
          const display = self.value.parentElement?.style.display
          if (display === 'none') return content.hide()
          if (content.getVisible()) content.show()
        })
      })
    }

    const viewer = inject(viewerInjectionKey, null)
    watchEffect(onClean => {
      if (viewer?.value) {
        viewer.value.add(content)
        handleMounted()
      }

      onClean(() => {
        if (viewer?.value) viewer.value.remove(content)
        content.destroy()
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
