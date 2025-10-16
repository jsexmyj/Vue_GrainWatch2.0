<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import PanelHistory from './components/PanelHistory.vue'
import PanelLayer from './components/PanelLayer.vue'
import MapView from './views/MapView.vue'
import PanelChat from './components/PanelChat.vue'
</script>

<template>
  <div id="app">
    <el-container>
      <!-- 头部标题 -->
      <el-header><AppHeader /></el-header>
      <el-main>
        <el-splitter>
          <!-- 左侧控制面板 -->
          <el-splitter-panel :collapsible="true" size="20%">
            <div class="left-panel">
              <!-- 对话历史记录 -->
              <PanelHistory />
              <!-- 图层控制 -->
              <PanelLayer />
            </div>
          </el-splitter-panel>

          <!-- 中间地图视图 -->
          <el-splitter-panel :min="200" size="60%">
            <MapView />
          </el-splitter-panel>
          <!-- 右侧对话框 -->
          <el-splitter-panel :min="200" size="20%">
            <PanelChat />
          </el-splitter-panel>
        </el-splitter>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
#app {
  height: 98vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.el-container {
  height: 100%;
  background-color: #0d3a68;
}

.el-main {
  flex: 1;
  overflow: hidden;
}

/* 确保分隔面板占满高度并设置分隔条样式 */
.el-splitter {
  height: 100%;
}

.el-splitter-panel {
  height: 100%;
}

.left-panel {
  height: 97%;
  background-color: #0d3a68;
  display: grid;
  grid-template-rows: 1fr 1fr; /* 上下等分空间 */
  gap: 35px; /* 两个面板之间的间距 */
  overflow: hidden; /* 防止内容溢出 */
}
</style>
