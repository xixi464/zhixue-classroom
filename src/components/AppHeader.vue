<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Bell, User, Tickets, SwitchButton } from '@element-plus/icons-vue'
import { userInfo } from '../data/siteData'

const keyword = ref('')
const avatarBroken = ref(false)

const handleSearch = () => {
  const text = keyword.value.trim()
  if (!text) {
    ElMessage.warning('请输入想学习的课程、讲师或技能关键词')
    return
  }
  ElMessage.success(`正在为你搜索「${text}」相关课程`)
}

const openMessages = () => {
  ElMessage({
    message: '你有 5 条未读消息：2 条课程更新提醒、3 条答疑回复',
    type: 'info',
    duration: 3200
  })
}

const handleCommand = (command) => {
  const labels = {
    profile: '个人信息',
    courses: '已购课程',
    logout: '退出登录'
  }
  if (command === 'logout') {
    ElMessage.success('已退出登录（演示环境）')
    return
  }
  ElMessage.info(`正在打开「${labels[command]}」页面`)
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner page-container">
      <router-link class="brand" to="/assignment3" aria-label="智学云课堂首页">
        <span class="brand-mark">智</span>
        <span class="brand-copy">
          <strong>智学云课堂</strong>
          <small>ZHIXUE CLASSROOM</small>
        </span>
      </router-link>

      <div class="header-search">
        <el-input
          v-model="keyword"
          size="large"
          clearable
          placeholder="搜索课程 / 讲师 / 技能关键词"
          aria-label="搜索课程"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <button class="search-btn" type="button" @click="handleSearch">搜索</button>
      </div>

      <div class="header-actions">
        <button class="message-btn" type="button" aria-label="消息通知" @click="openMessages">
          <el-icon><Bell /></el-icon>
          <span class="unread-badge">5</span>
        </button>

        <el-dropdown trigger="hover" placement="bottom-end" popper-class="user-dropdown" @command="handleCommand">
          <div class="user-trigger" tabindex="0" role="button" aria-label="用户菜单">
            <img
              v-if="!avatarBroken"
              :src="userInfo.avatar"
              :alt="`${userInfo.name} 的头像`"
              @error="avatarBroken = true"
            />
            <span v-else class="avatar-fallback">{{ userInfo.name.charAt(0) }}</span>
            <i class="online-dot"></i>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <li class="dropdown-user" role="presentation">
                <span class="dropdown-avatar">{{ userInfo.name.charAt(0) }}</span>
                <div class="dropdown-meta">
                  <strong>{{ userInfo.name }}</strong>
                  <small>{{ userInfo.level }} · 已购 8 门课程</small>
                </div>
              </li>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>个人信息
              </el-dropdown-item>
              <el-dropdown-item command="courses">
                <el-icon><Tickets /></el-icon>已购课程
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <el-icon><SwitchButton /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 120;
  background: rgba(255, 255, 255, 0.88);
  border-bottom: 1px solid rgba(232, 236, 245, 0.9);
  backdrop-filter: saturate(160%) blur(16px);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 28px;
  min-height: 76px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: linear-gradient(135deg, #1d4ed8, #38bdf8);
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.28);
  color: #fff;
  font-size: 19px;
  font-weight: 700;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-copy strong {
  color: var(--navy);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.brand-copy small {
  color: #93a0b5;
  font-size: 9px;
  letter-spacing: 0.16em;
  line-height: 1;
}

.header-search {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 520px;
  gap: 10px;
}

.header-search :deep(.el-input__wrapper) {
  padding: 2px 16px;
  border-radius: 12px;
  background: #f4f7fd;
  border: 1px solid #e6ebf5;
  box-shadow: none;
  transition: all 0.2s ease;
}

.header-search :deep(.el-input__wrapper:hover) {
  border-color: #cfdaf0;
}

.header-search :deep(.el-input__wrapper.is-focus) {
  background: #fff;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.header-search :deep(.el-input__inner) {
  height: 42px;
  font-size: 13.5px;
  color: var(--text);
}

.header-search :deep(.el-input__prefix) {
  color: #8b97ab;
  font-size: 17px;
}

.search-btn {
  flex-shrink: 0;
  height: 38px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: var(--brand);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.search-btn:hover {
  background: var(--brand-dark);
  transform: translateY(-1px);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: auto;
  flex-shrink: 0;
}

.message-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: #f4f7fd;
  color: #4b5668;
  font-size: 19px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.message-btn:hover {
  background: #e9f0fe;
  color: var(--brand);
}

.unread-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  display: grid;
  place-items: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  border: 2px solid #fff;
  border-radius: 999px;
  background: var(--price);
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 4px 10px rgba(244, 63, 94, 0.32);
}

.user-trigger {
  position: relative;
  width: 44px;
  height: 44px;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(15, 31, 70, 0.16);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.26);
}

.user-trigger img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
}

.online-dot {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px #fff;
}

.dropdown-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: -6px -6px 6px;
  padding: 14px 16px;
  border-bottom: 1px solid #eef2f9;
  list-style: none;
  cursor: default;
}

.dropdown-avatar {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.dropdown-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dropdown-meta strong {
  color: var(--text);
  font-size: 13.5px;
}

.dropdown-meta small {
  color: var(--muted);
  font-size: 11px;
}

@media (max-width: 900px) {
  .header-inner {
    gap: 16px;
  }

  .brand-copy small {
    display: none;
  }

  .header-search {
    max-width: none;
  }

  .search-btn {
    display: none;
  }
}

@media (max-width: 640px) {
  .header-inner {
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .brand-mark {
    width: 38px;
    height: 38px;
    font-size: 17px;
  }

  .brand-copy strong {
    font-size: 16px;
  }

  .header-search {
    order: 3;
    flex-basis: 100%;
  }

  .header-actions {
    gap: 10px;
  }

  .message-btn {
    width: 38px;
    height: 38px;
  }

  .user-trigger {
    width: 40px;
    height: 40px;
  }
}
</style>

<style>
.user-dropdown {
  width: 218px;
  padding: 6px !important;
  border-radius: 14px !important;
  border: 1px solid #eef2f9 !important;
  box-shadow: 0 16px 40px rgba(15, 31, 70, 0.14) !important;
}

.user-dropdown .el-dropdown-menu {
  padding: 0;
}

.user-dropdown .el-dropdown-item {
  margin: 2px 0;
  padding: 9px 12px;
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 13px;
  gap: 8px;
}

.user-dropdown .el-dropdown-item:hover {
  background: #f2f6ff;
  color: var(--brand);
}

.user-dropdown .el-dropdown-item .el-icon {
  font-size: 15px;
}

.user-dropdown .el-dropdown-menu__item--divided {
  border-top: 1px solid #eef2f9;
  margin-top: 6px;
}
</style>
