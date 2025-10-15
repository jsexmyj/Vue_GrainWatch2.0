<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import PanelHistory from './components/PanelHistory.vue'
</script>

<template>
  <div id="app">
    <el-container>
      <!-- 头部标题 -->
      <el-header><AppHeader /></el-header>
      <el-main>
        <el-row>
          <!-- 左侧控制面板 -->
          <div class="left-panel">
            <el-col :span="5">
              <!-- 对话历史记录 -->
              <PanelHistory />
              <!-- 图层控制 -->
              <PanelLayer />
            </el-col>
          </div>

          <!-- 中间地图视图 -->
          <el-col :span="12">
            <MapView />
          </el-col>
          <!-- 右侧对话框 -->
          <el-col :span="7">
            <PanelChat />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
#app {
  height: 100vh; /* 整个应用占满视口高度 */
  display: flex;
  flex-direction: column;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  flex: 1;
  overflow: hidden;
}
.left-panel {
  padding: 10px;
  background-color: #0d3a68;
}
</style>
