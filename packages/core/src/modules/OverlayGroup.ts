import type Content from './Content'
import type LabelMarker from './LabelMarker'
import type Marker from './Marker'

export type OverlayGroupItems = Array<Marker | LabelMarker | Content>

export default class OverlayGroup {
  private _overlays: OverlayGroupItems = []

  constructor(overlays?: OverlayGroupItems) {
    this._overlays = overlays || []
  }

  addOverlay(overlay: Marker | LabelMarker | Content) {
    this._overlays.push(overlay)
  }

  addOverlays(overlays: OverlayGroupItems) {
    this._overlays = this._overlays.concat(overlays)
  }

  hasOverlay(overlay: Marker | LabelMarker | Content) {
    return this._overlays.indexOf(overlay) !== -1
  }

  getOverlays() {
    return this._overlays
  }

  removeOverlay(overlay: Marker | LabelMarker | Content) {
    const index = this._overlays.indexOf(overlay)
    if (index !== -1) {
      this._overlays.splice(index, 1)
    }
  }

  removeOverlays(overlays: OverlayGroupItems) {
    overlays.forEach(overlay => {
      this.removeOverlay(overlay)
    })
  }

  clearOverlays() {
    this._overlays = []
  }

  show() {
    this._overlays.forEach(overlay => {
      overlay.show()
    })
  }

  hide() {
    this._overlays.forEach(overlay => {
      overlay.hide()
    })
  }
}
