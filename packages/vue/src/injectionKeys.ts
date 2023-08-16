import type { ShallowRef, Ref } from 'vue'
import type { Content, Viewer, OverlayGroupItem } from '@lymp/core'
import { createInjectionKey } from './_utils/vue/create-injection-key'

type OverlayGroupHandler = {
  add(item: OverlayGroupItem): void
  remove(item: OverlayGroupItem): void
  hasViewer: Ref<boolean>
}

export const viewerInjectionKey =
  createInjectionKey<ShallowRef<Viewer | null>>('viewer')
export const contentInjectionKey =
  createInjectionKey<ShallowRef<Content | null>>('content')
export const overlayGroupHandlerInjectionKey =
  createInjectionKey<OverlayGroupHandler>('addOverlayGroupItem')
