<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useMapStore } from '../stores/mapStore'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const mapStore = useMapStore()
const mapContainer = ref<HTMLElement>()
const map = ref<L.Map>()
const tileLayers = ref<Record<string, L.TileLayer>>({})
const geoJsonLayers = ref<Record<string, L.GeoJSON>>({})

// 监听缩放到图层范围事件
const handleZoomToBounds = (e: CustomEvent<{ bounds: L.LatLngBounds }>) => {
  if (map.value && e.detail?.bounds) {
    map.value.fitBounds(e.detail.bounds, {
      padding: [50, 50], // 添加一些内边距使图层不会太贴近边缘
      maxZoom: 18, // 限制最大缩放级别
      animate: true, // 使用动画效果
    })
  }
}

// 初始化地图
onMounted(() => {
  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value, {
    zoomControl: false,
  }).setView(mapStore.center, mapStore.zoom)

  // 添加缩放事件监听
  window.addEventListener('zoom-to-bounds', handleZoomToBounds as EventListener)

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

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('zoom-to-bounds', handleZoomToBounds as EventListener)
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
      const layer = geoJsonLayers.value[layerId]
      if (layer && !newLayers.some((l) => l.id === layerId)) {
        layer.remove()
        delete geoJsonLayers.value[layerId]
      }
    })

    // 2. 添加、重建或更新可见性
    newLayers.forEach((layer) => {
      let mapLayer = geoJsonLayers.value[layer.id]

      // 检查图层是否存在，或者数据是否发生变化 (这里简化为如果不存在就创建)
      // 如果您的后端确保每次上传都使用新的ID，那么以下逻辑是正确的
      if (!mapLayer && layer.data) {
        // 新建图层 - 使用默认样式并为不同图层分配不同颜色
        const colors = ['#FF0033', '#006699', '#FFCC00', '#CC9909', '#33FF00', '#CC66FF']
        const colorIndex = newLayers.indexOf(layer) % colors.length
        const color = colors[colorIndex]

        mapLayer = L.geoJSON(layer.data, {
          style: {
            color: color,
            weight: 2,
            opacity: 0.8,
          },
        })
        console.log('Created GeoJSON layer:', layer.id, layer.name, 'color:', color)
        geoJsonLayers.value[layer.id] = mapLayer
      }

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
