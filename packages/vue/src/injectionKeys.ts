import type { ShallowRef } from 'vue'
import type { Content, Viewer } from '@lymp/core'
import { createInjectionKey } from './_utils/vue/create-injection-key'

export const viewerInjectionKey =
  createInjectionKey<ShallowRef<Viewer | null>>('viewer')
export const contentInjectionKey =
  createInjectionKey<ShallowRef<Content | null>>('content')
