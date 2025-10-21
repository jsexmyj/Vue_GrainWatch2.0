<script setup lang="ts">
import { useMapStore } from '../stores/mapStore'

const mapStore = useMapStore()
</script>

<template>
  <div class="panel-layer">
    <!-- 标题 -->
    <div class="panel-title">
      <span class="title-text">图层显示</span>
    </div>

    <!-- 数据图层列表 -->
    <div class="layer-content">
      <!-- 底图选择器 -->
      <div class="layer-group">
        <div class="basemap-selector-group">
          <div class="group-title">底图选择</div>
          <el-select
            v-model="mapStore.activeBasemapId"
            placeholder="请选择底图"
            class="basemap-select"
            popper-class="basemap-popper"
          >
            <el-option
              v-for="basemap in mapStore.basemaps"
              :key="basemap.id"
              :label="basemap.name"
              :value="basemap.id"
            />
          </el-select>
        </div>
      </div>

      <!-- 业务图层组 -->
      <div class="layer-group" v-if="mapStore.geoJsonLayers.length > 0">
        <div class="group-title">业务图层</div>
        <el-scrollbar class="layer-scrollbar">
          <div
            v-for="layer in mapStore.geoJsonLayers.sort((a, b) => b.order - a.order)"
            :key="layer.id"
            class="layer-item"
          >
            <el-checkbox v-model="layer.visible" class="layer-checkbox">
              {{ layer.name }}
            </el-checkbox>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.panel-layer {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
}

.panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
}

.title-text {
  font-size: 18px;
}

.layer-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.layer-group {
  margin-bottom: 16px;
}
.basemap-popper {
  background-color: rgb(5, 87, 169) !important;
}

.basemap-selector-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.group-title {
  color: #ffffff;
  font-size: 16px;
  opacity: 0.8;
  white-space: nowrap; /* 防止标题换行 */
}

.layer-scrollbar {
  margin-top: 1px;
  height: 300px; /* 给定一个合适的固定高度，超出时显示滚动条 */
  overflow: auto;
}
/* el-select 输入框背景和边框 - 透明度 0.3 */
:deep(.basemap-select) {
  width: 100%;
}

:deep(.basemap-select .el-input__wrapper) {
  background-color: rgba(5, 87, 169, 0.3) !important;
  border: 1px solid rgba(5, 87, 169, 0.3) !important;
  box-shadow: none !important;
}

:deep(.basemap-select .el-input__wrapper:hover) {
  background-color: rgba(5, 87, 169, 0.4) !important;
  border-color: rgba(5, 87, 169, 0.4) !important;
  box-shadow: none !important;
}

:deep(.basemap-select .el-input__wrapper.is-focus) {
  background-color: rgba(5, 87, 169, 0.4) !important;
  border-color: rgba(5, 87, 169, 0.4) !important;
  box-shadow: none !important;
}

/* el-select 输入框内的文字颜色 */
:deep(.basemap-select .el-select__wrapper) {
  background-color: transparent !important;
}

:deep(.basemap-select input.el-input__inner) {
  color: #ffffff !important;
  background-color: transparent !important;
}

:deep(.basemap-select .el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* 选中后显示的文字颜色 */
:deep(.basemap-select .el-select__selected-item) {
  color: #ffffff !important;
}

:deep(.basemap-select .el-select__placeholder) {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* 下拉箭头颜色 */
:deep(.basemap-select .el-select__suffix) {
  color: #ffffff !important;
}

:deep(.basemap-select .el-icon) {
  color: #ffffff !important;
}

.layer-item {
  padding: 7px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 14px;
  margin-bottom: 14px;
}

.layer-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}
/* 自定义滚动条 */
.layer-item::-webkit-scrollbar {
  width: 4px;
}

.layer-item::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.layer-item::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.layer-item::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.layer-checkbox {
  padding-left: 14px;
  padding-right: 4px;
  font-size: 16px;
  color: #ffffff;
}

:deep(.el-checkbox__label) {
  color: #ffffff;
  font-size: 16px;
}

:deep(.el-checkbox__input .el-checkbox__inner) {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #409eff;
  border-color: #409eff;
}
</style>

<!-- 全局样式：下拉框选项样式（不透明） -->
<style lang="css">
.basemap-popper {
  background-color: rgb(5, 87, 169) !important;
  border: 1px solid rgb(5, 87, 169) !important;
}

.basemap-popper .el-select-dropdown__item {
  color: #ffffff !important;
  background-color: transparent !important;
}

.basemap-popper .el-select-dropdown__item:hover {
  background-color: rgba(255, 255, 255, 0.15) !important;
}

.basemap-popper .el-select-dropdown__item.is-selected {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.2) !important;
  font-weight: bold;
}

.basemap-popper .el-popper__arrow::before {
  background-color: rgb(5, 87, 169) !important;
  border: 1px solid rgb(5, 87, 169) !important;
}
</style>
