<script lang="ts" setup>
import logoUrl from '../assets/logo.png'
</script>
<template>
  <div class="header">
    <div class="header-logo">
      <el-avatar shape="square" :size="30" :src="logoUrl" />
      <div class="logo-title">GrainWatch</div>
    </div>
    <el-divider direction="vertical" />
    <div class="header-content">桌面工作台</div>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  height: 60px;
  align-items: center;
  background-color: #0d3a68; /* 深蓝背景，可根据需要调整 */
  padding: 10px 20px;
}

.header-logo {
  display: flex;
  align-items: center;
}


::v-deep(.el-avatar) {
  width: 40px;
  height: 40px;

}

::v-deep(.el-avatar img) {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.logo-title {
  font-size: 40px;
  font-weight: bold;
  margin-left: 10px;
  background: linear-gradient(90deg, #00c9a7, #007cf0); /* 蓝绿渐变 */
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-content {
  font-size: 34px;
  color: #ffffff; /* 白色字体 */
}

::v-deep(.el-divider--vertical) {
  border-left: 2px solid #ffffff;
  height: 40px;
  margin: 0 15px;
}
</style>
