<script setup lang="ts">
import { ref } from 'vue'
import { useMapStore } from '../stores/mapStore'

// 模拟聊天数据
const messages = ref([
  {
    id: 1,
    role: 'agent',
    content: 'Hello! How can I help you today?',
    timestamp: '10:30',
  },
  {
    id: 2,
    role: 'user',
    content: 'I need assistance with designing.',
    timestamp: '10:31',
  },
  {
    id: 3,
    role: 'agent',
    content: 'I Courte! Tell you more your design requirements.',
    timestamp: '10:32',
  },
])

// 输入与上传状态
const inputMessage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const uploadStatus = ref('')

const mapStore = useMapStore()

// 点击附加按钮：触发隐藏文件选择
function onAttachClick() {
  fileInput.value?.click()
}

// 处理文件选择
async function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return
  const file = files[0]
  if (!file) return
  await uploadFile(file)
  // 清空选择，方便重复上传同一文件
  target.value = ''
}

// 上传实现：POST 到 /api/upload，处理返回并加入 mapStore
async function uploadFile(file: File) {
  uploadStatus.value = 'uploading'
  try {
    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: fd,
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    if (data && data.status === 'success') {
      const label: string = data.label || file.name
      const geojson: GeoJSON.FeatureCollection = data.geojson
      // 调用 mapStore 添加图层
      try {
        mapStore.addGeoJSONLayer(label, geojson)
        console.log('Added GeoJSON layer:', label)
      } catch (err) {
        console.error('Failed to add geojson to store', err)
      }
      uploadStatus.value = 'success'
    } else {
      console.error('Upload API returned error', data)
      uploadStatus.value = 'failed'
    }
  } catch (err) {
    console.error('Upload failed', err)
    uploadStatus.value = 'failed'
  } finally {
    // 在短时间后隐藏状态提示
    setTimeout(() => {
      uploadStatus.value = ''
    }, 2000)
  }
}

// 发送消息（将信息加入本地消息列表）
function sendMessage() {
  const text = inputMessage.value && inputMessage.value.trim()
  if (!text) return
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text,
    timestamp: new Date().toLocaleTimeString(),
  })
  inputMessage.value = ''
}
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
            <div v-for="msg in messages" :key="msg.id" :class="['message-item', msg.role]">
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
          <el-button class="attach-btn" circle :icon="'Paperclip'" @click="onAttachClick">
            <img src="../assets/附件.svg" class="icon-img" alt="上传文件" />
          </el-button>

          <!-- 隐藏的文件输入 -->
          <input
            ref="fileInput"
            type="file"
            accept=".zip,application/zip,application/x-zip-compressed,application/json,application/geo+json"
            style="display: none"
            @change="onFileChange"
          />

          <el-input
            v-model="inputMessage"
            class="message-input"
            placeholder="请输入文字..."
            clearable
          />

          <!-- 上传状态提示 -->
          <div class="upload-status" v-if="uploadStatus">
            {{
              uploadStatus === 'uploading'
                ? '上传中...'
                : uploadStatus === 'success'
                  ? '上传成功'
                  : '上传失败'
            }}
          </div>

          <el-button class="send-btn" circle type="primary" @click="sendMessage">
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

.upload-status {
  color: #ffffff;
  font-size: 12px;
  margin-left: 8px;
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
