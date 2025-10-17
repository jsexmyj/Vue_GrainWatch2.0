<script setup lang="ts">
import { ref } from 'vue'

// 模拟聊天数据
const messages = ref([
  {
    id: 1,
    role: 'agent',
    content: 'Hello! How can I help you today?使用 Element Plus 的 el-scrollbar 组件实现平滑滚动，自定义了滚动条样式',
    timestamp: '10:30'
  },
  {
    id: 2,
    role: 'user',
    content: 'I need assistance with designing.',
    timestamp: '10:31'
  },
  {
    id: 3,
    role: 'agent',
    content: 'I Courte! Tell you more your design requirements.',
    timestamp: '10:32'
  },
  {
    id: 4,
    role: 'agent',
    content: '我已把 select 和 options 的样式全部改为“红底白字”，并做了以下具体修改与验证：',
    timestamp: '10:32'
  },
  {
    id: 5,
    role: 'user',
    content: '我已把 select 和 options 的样式全部改为“红底白将 Select 输入框（.basemap-select .el-input__wrapper）设为红色半透明ect 的 popper（下拉容器）添加 .basemap-popper 覆盖样式，背景同为 rgba(255,0,0,0.3)，并设置边框、模糊效果。背景：rgba(255,0,0,0.3)，边框 rgba(255,0,0,0.5)，文字白色字”，并做了以下具体修改与验证：',
    timestamp: '10:34'
  }
])
</script>
<template>
  <div class="panel-layer">
    <!-- 标题 -->
    <div class="panel-title">
      <slot name="title-text">用户聊天界面</slot>
    </div>

    <div class="panel-content">
      <!-- 消息界面 -->
      <div class="panel-message">
        <el-scrollbar class="message-scrollbar">
          <div class="messages-container">
            <div
              v-for="msg in messages"
              :key="msg.id"
              :class="['message-item', msg.role]"
            >
              <div :class="['message-bubble', msg.role]">
                {{ msg.content }}
              </div>
            </div>
            <slot name="content"></slot>
          </div>
        </el-scrollbar>
      </div>

      <!-- 消息输入框 -->
      <div class="panel-input-wrapper">
        <div class="input-container">
          <el-button
            class="attach-btn"
            circle
            :icon="'Paperclip'"
          >
            <img src="../assets/附件.svg" class="icon-img" alt="上传文件" />
          </el-button>

          <el-input
            v-model="inputMessage"
            class="message-input"
            placeholder="请输入文字..."
            clearable
          />

          <el-button
            class="send-btn"
            circle
            type="primary"
          >
            <img src="../assets/发送.svg" class="icon-img" alt="发送" />
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.panel-layer {
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #0d3b68d0;
  border-radius: 8px;
  padding-left: 15px;
  position: relative; /* 为绝对定位的输入框容器提供参考 */
}

.panel-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  padding: 15px 0;
  flex-shrink: 0; /* 防止标题被压缩 */
}

.panel-content {
  position: relative; /* 为消息区域提供相对定位上下文 */
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 80px; /* 为固定定位的输入框留出空间 */
}

.panel-message {
  flex: 1; /* 让消息区域填充剩余空间 */
  height: 85%; /* 保持85%的高度 */
  overflow: hidden;
}

.message-scrollbar {
  height: 100%;
}

.messages-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 气泡 样式 */
.message-item {
  display: flex;
  animation: fadeIn 0.3s ease-in;
}

.message-item.agent {
  justify-content: flex-start;
}

.message-item.user {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 60%;
  padding: 12px 28px;
  border-radius: 20px;
  font-size: 16px;
  line-height: 1.5;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: inline-block; /* 让气泡宽度适应内容 */
}

.message-bubble.agent {
  background: linear-gradient(135deg, #3e4887 0%, #3e4887 100%);
  color: #ffffff;
  border-bottom-left-radius: 2px;
}

.message-bubble.user {
  background: linear-gradient(135deg, #00b4d8 0%, #0096c7 100%);
  color: #ffffff;
  border-bottom-right-radius: 2px;
}

/* 输入框 */
.panel-input-wrapper {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 0 15px;
  background: transparent;
  z-index: 10;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #567596 0%, #7e9db8 100%);
  border-radius: 30px;
  padding: 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.attach-btn,
.send-btn {
  width: 45px;
  height: 45px;
  flex-shrink: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.attach-btn {
  background: linear-gradient(135deg, #a4b0f1 0%, #9e85c2 100%);
}

.attach-btn:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.send-btn {
  background: linear-gradient(135deg, #a4b0f1 0%, #9e85c2 100%);
}

.send-btn:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.icon-img {
  width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
}

.message-input {
  flex: 1;
}

.message-input :deep(.el-input__wrapper) {
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0 16px;
}

.message-input :deep(.el-input__inner) {
  color: #ffffff;
  font-size: 18px;
}

.message-input :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 自定义滚动条样式 */
:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}

:deep(.el-scrollbar__thumb) {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

:deep(.el-scrollbar__thumb:hover) {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
