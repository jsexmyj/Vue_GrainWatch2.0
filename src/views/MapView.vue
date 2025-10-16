<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useMapStore } from '../stores/mapStore'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const mapStore = useMapStore()
const mapContainer = ref<HTMLElement>()
const map = ref<L.Map>()
const tileLayers = ref<Record<string, L.TileLayer>>({})
const geoJsonLayers = ref<Record<string, L.GeoJSON>>({})

// 初始化地图
onMounted(() => {
  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value, {
    zoomControl: false,
  }).setView(mapStore.center, mapStore.zoom)

  // 初始化所有底图图层
  mapStore.basemaps.forEach((basemap) => {
    tileLayers.value[basemap.id] = L.tileLayer(basemap.url, {
      subdomains: basemap.subdomains,
      attribution: basemap.attribution,
      maxZoom: 19,
      maxNativeZoom: 18,
    })
  })

  // 添加当前激活的底图
  const activeBasemap = tileLayers.value[mapStore.activeBasemapId]
  if (activeBasemap) {
    activeBasemap.addTo(map.value)
  }

  // 添加缩放控件
  L.control
    .zoom({
      position: 'topright',
      zoomInTitle: '放大',
      zoomOutTitle: '缩小',
    })
    .addTo(map.value)

  // 添加比例尺控件
  L.control
    .scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
    })
    .addTo(map.value)
})

// 监听激活底图的变化
watch(
  () => mapStore.activeBasemapId,
  (newId, oldId) => {
    if (map.value) {
      const oldLayer = tileLayers.value[oldId]
      if (oldLayer) {
        oldLayer.remove()
      }
      const newLayer = tileLayers.value[newId]
      if (newLayer) {
        newLayer.addTo(map.value)
      }
    }
  },
)

// 监听 GeoJSON 图层的变化
watch(
  () => mapStore.geoJsonLayers,
  (newLayers) => {
    if (!map.value) return

    // 移除不再存在的图层
    Object.keys(geoJsonLayers.value).forEach((layerId) => {
      if (!newLayers.some((l) => l.id === layerId)) {
        geoJsonLayers.value[layerId].remove()
        delete geoJsonLayers.value[layerId]
      }
    })

    // 添加或更新图层
    newLayers.forEach((layer) => {
      if (!geoJsonLayers.value[layer.id] && layer.data) {
        // 新建图层
        geoJsonLayers.value[layer.id] = L.geoJSON(layer.data)
      }

      const mapLayer = geoJsonLayers.value[layer.id]
      if (mapLayer) {
        if (layer.visible && !map.value!.hasLayer(mapLayer)) {
          mapLayer.addTo(map.value!)
        } else if (!layer.visible && map.value!.hasLayer(mapLayer)) {
          mapLayer.remove()
        }
      }
    })
  },
  { deep: true },
)
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
