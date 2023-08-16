import type { ShallowRef } from 'vue'
import type { Viewer, OverlayGroup, Content } from '@lymp/core'
import { createInjectionKey } from './utils/vue/create-injection-key'

export const viewerInjectionKey =
  createInjectionKey<ShallowRef<Viewer | null>>('viewer')
export const overlayGroupInjectionKey =
  createInjectionKey<OverlayGroup>('overlayGroup')
export const setContentInjectionKey =
  createInjectionKey<(content: Content) => void>('setContent')
