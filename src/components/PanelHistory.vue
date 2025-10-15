<script setup lang="ts">
const HistoryList = [
  '成都市土地利用分类',
  '河流水质检测处理',
  '城市覆盖率统计',
  '植被覆盖指数计算',
  '气象数据分析',
  '交通流量监测',
]
</script>

<template>
  <div class="history-panel">
    <!-- 标题 -->
    <div class="panel-title">
      <span class="title-text">历史对话</span>
      <el-icon class="title-icon"><ArrowRight /></el-icon>
    </div>

    <!-- 新建对话按钮 -->
    <div class="new-conversation-btn">
      <img src="../assets/添加.svg" class="btn-icon" alt="添加" />
      <span>新建对话</span>
    </div>

    <!-- 历史记录列表 -->
    <el-scrollbar height="100%" class="history-list-container">
      <div class="history-list">
        <div v-for="item in HistoryList" :key="item" class="history-item">
          <div class="item-title">{{ item }}</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.history-panel {
  height: 100%; /* 设置为父容器的一半高度 */
  min-height: 200px; /* 设置最小高度以确保内容可见性 */
  display: flex;
  flex-direction: column;
  background: rgba(13, 58, 104, 0.6);
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

.title-icon {
  font-size: 16px;
  opacity: 0.7;
}

.new-conversation-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.new-conversation-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 自定义滚动条 */
.history-list::-webkit-scrollbar {
  width: 4px;
}

.history-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.history-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.history-list-container {
  margin-top: 1px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px;
}

.history-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.history-item:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.item-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding-left: 8px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item-date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}
</style>
