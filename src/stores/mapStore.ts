import { defineStore } from 'pinia'
import type { LatLngTuple } from 'leaflet'

// GeoJSON 图层状态
export interface GeoJsonLayerState {
  id: string
  name: string
  visible: boolean
  type: 'geojson'
  data: GeoJSON.FeatureCollection
  order: number // 优先级
}

// 底图配置
export interface Basemap {
  id: string
  name: string
  url: string
  subdomains?: string[]
  attribution: string
}

export const useMapStore = defineStore('map', {
  state: () => ({
    center: [30.659084, 104.064841] as LatLngTuple,
    zoom: 12,
    // 底图列表
    basemaps: [
      {
        id: 'gaode-road',
        name: '路网地图(高德)',
        url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        subdomains: ['1', '2', '3', '4'],
        attribution: '© 高德地图',
      },
      {
        id: 'gaode-satellite',
        name: '卫星地图(高德)',
        url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        subdomains: ['1', '2', '3', '4'],
        attribution: '© 高德地图',
      },
      {
        id: 'osm-road',
        name: '路网地图(OSM)',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c'],
        attribution: '© OpenStreetMap contributors',
      },
    ] as Basemap[],
    activeBasemapId: 'gaode-road', // 默认激活的底图
    // 业务图层
    geoJsonLayers: [] as GeoJsonLayerState[],
    nextLayerOrder: 1,
    nextLayerId: 0, // 添加自增ID计数器
  }),

  actions: {
    // 设置当前激活的底图
    setActiveBasemap(basemapId: string) {
      this.activeBasemapId = basemapId
    },

    // 切换业务图层的可见性
    toggleGeoJsonLayerVisibility(layerId: string) {
      const layer = this.geoJsonLayers.find((l) => l.id === layerId)
      if (layer) {
        layer.visible = !layer.visible
      }
    },

    // 添加 GeoJSON 图层
    addGeoJSONLayer(name: string, data: GeoJSON.FeatureCollection) {
      // 使用时间戳和自增ID保证唯一性
      const id = `geojson-${Date.now()}-${++this.nextLayerId}`
      this.geoJsonLayers.push({
        id,
        name, // 使用传入的文件名
        visible: true,
        type: 'geojson',
        data,
        order: this.nextLayerOrder++, // 顺序增加
      })
      console.log('Added to store:', id, name)
    },
  },
})
