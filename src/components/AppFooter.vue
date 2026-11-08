<script setup>
import { ElMessage } from 'element-plus'

const columns = [
  {
    title: '学习中心',
    links: [
      { label: '精选课程', target: 'courses' },
      { label: '学习记录', target: 'records' },
      { label: '热门教程', target: 'courses' }
    ]
  },
  {
    title: '帮助支持',
    links: [
      { label: '常见问题', target: 'faq' },
      { label: '在线客服', action: '在线客服' },
      { label: '意见反馈', action: '意见反馈' }
    ]
  },
  {
    title: '关于我们',
    links: [
      { label: '平台介绍', action: '平台介绍' },
      { label: '讲师入驻', action: '讲师入驻' },
      { label: '合作联系', action: '合作联系' }
    ]
  }
]

const handleLink = (link) => {
  if (link.target) {
    document.getElementById(link.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }
  ElMessage.info(`正在打开「${link.action}」`)
}
</script>

<template>
  <footer class="app-footer">
    <div class="page-container">
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-mark">智</span>
            <strong>智学云课堂</strong>
          </div>
          <p>让优质教育触手可及，用技术陪你走得更远。</p>
        </div>

        <nav class="footer-links">
          <div v-for="column in columns" :key="column.title" class="link-col">
            <h4>{{ column.title }}</h4>
            <button
              v-for="link in column.links"
              :key="link.label"
              type="button"
              class="footer-link"
              @click="handleLink(link)"
            >
              {{ link.label }}
            </button>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© 2026 智学云课堂 Zhixue Classroom. All rights reserved.</span>
        <span>Built with Vue 3 · Element Plus · Vite</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: 80px;
  padding: 46px 0 24px;
  background: radial-gradient(120% 140% at 12% 0%, #16336d 0%, #0f1f46 46%, #0a1530 100%);
  color: rgba(203, 221, 255, 0.66);
}

.footer-main {
  display: flex;
  justify-content: space-between;
  gap: 48px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
}

.footer-logo strong {
  color: #f1f6ff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.footer-brand p {
  max-width: 300px;
  margin-top: 14px;
  color: rgba(203, 221, 255, 0.56);
  font-size: 12.5px;
  line-height: 1.9;
}

.footer-links {
  display: flex;
  gap: 72px;
}

.link-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-col h4 {
  margin-bottom: 4px;
  color: #eaf2ff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.footer-link {
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(203, 221, 255, 0.58);
  font-size: 12.5px;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #93c5fd;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  color: rgba(203, 221, 255, 0.42);
  font-size: 11.5px;
}

@media (max-width: 860px) {
  .footer-main {
    flex-direction: column;
    gap: 32px;
  }

  .footer-links {
    gap: 48px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 520px) {
  .app-footer {
    margin-top: 56px;
    padding-top: 36px;
  }

  .footer-links {
    flex-wrap: wrap;
    gap: 28px 40px;
  }
}
</style>
