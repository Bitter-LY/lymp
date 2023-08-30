const highlightColor = '#EFBB51'
const highlightWidth = 15
let highlightId: string | null = null

const baseLineStyle = {
  altitude: 0,
  lineWidth: 10,
  headColor: '#7F3CFF',
  trailColor: 'rgba(128, 128, 128, 0.5)',
  interval: 0.25,
  duration: 5000
}

const setPipeLayer = (viewer: Viewer) => {
  const loca = new Loca.Container({
    map: viewer
  })
  const geo = new Loca.GeoJSONSource({
    data: handleGeo(pipePointList.value)
  })
  const layer = new PulseLineLayer({
    loca,
    zIndex: 10,
    opacity: 1,
    visible: props.GisPic,
    zooms: [2, 22]
  })
  pointLayer.value = layer
  layer.setSource(geo)
  layer.setStyle(baseLineStyle)
  loca.add(layer)
  loca.animate.start()

  setGridEvent(layer, viewer, () => {
    layer.setStyle(
      !highlightId
        ? baseLineStyle
        : {
            ...baseLineStyle,
            headColor: (_: any, feature: any) => {
              return feature.properties.id === highlightId
                ? highlightColor
                : baseLineStyle.headColor
            },
            lineWidth: highlightWidth
          }
    )
  })
}

const gridInfoVisible = ref(false)
function setGridEvent(
  layer: PulseLineLayer,
  viewer: Viewer,
  updateStyle: () => void
) {
  layer.on('click', viewer, async (e: AMapEvent) => {
    console.log(e)
    gridInfoVisible.value = true
  })

  viewer.on('mousemove', (e: AMapEvent) => {
    const target = layer.queryFeature([e.pixel.x, e.pixel.y])
    if (!target) {
      const flash = highlightId !== null
      highlightId = null
      if (flash) updateStyle()
      return
    }
    if (highlightId === target.properties.id) return
    highlightId = target.properties.id
    updateStyle()
  })
}
