<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowRight, ChatDotRound, Document, Headset } from '@element-plus/icons-vue'
import { faqs } from '../data/siteData'

const activeFaq = ref('faq-1')

const supports = [
  {
    icon: Headset,
    title: '在线客服',
    desc: '7×24 小时在线，平均 30 秒响应',
    action: '立即咨询'
  },
  {
    icon: Document,
    title: '帮助文档',
    desc: '常见问题、学习指南与操作手册',
    action: '查看文档'
  },
  {
    icon: ChatDotRound,
    title: '意见反馈',
    desc: '你的每一条建议，我们都会认真看',
    action: '提交反馈'
  }
]

const handleSupport = (title) => {
  ElMessage.success(`已为你打开「${title}」服务`)
}

const contact = () => {
  ElMessage.success('在线客服已接入，请稍候…')
}
</script>

<template>
  <section id="faq" class="section faq-section">
    <div class="page-container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Help Center</span>
          <h2 class="section-title">帮助中心 · 常见问题</h2>
          <p class="section-sub">关于课程购买、学习与售后的高频问题，答案都在这里</p>
        </div>
      </div>

      <div class="faq-layout">
        <aside class="help-card">
          <span class="help-glow"></span>
          <div class="help-head">
            <span class="help-icon">
              <el-icon><Headset /></el-icon>
            </span>
            <div>
              <h3>还有疑问？</h3>
              <p>客服团队工作日 09:00 - 21:00 在线，随时为你解答。</p>
            </div>
          </div>

          <div class="support-list">
            <button
              v-for="item in supports"
              :key="item.title"
              type="button"
              class="support-item"
              @click="handleSupport(item.title)"
            >
              <span class="support-icon">
                <el-icon><component :is="item.icon" /></el-icon>
              </span>
              <span class="support-copy">
                <strong>{{ item.title }}</strong>
                <small>{{ item.desc }}</small>
              </span>
              <span class="support-action">{{ item.action }}</span>
            </button>
          </div>

          <el-button class="help-cta" round @click="contact">
            联系在线客服
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </aside>

        <div class="faq-list">
          <el-collapse v-model="activeFaq" accordion>
            <el-collapse-item v-for="(item, index) in faqs" :key="item.id" :name="item.id">
              <template #title>
                <div class="faq-title">
                  <span class="faq-num">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="faq-question">{{ item.question }}</span>
                </div>
              </template>
              <p class="faq-answer">{{ item.answer }}</p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  scroll-margin-top: 96px;
}

.faq-layout {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 24px;
  margin-top: 28px;
  align-items: start;
}

.help-card {
  position: relative;
  overflow: hidden;
  padding: 28px 26px;
  border-radius: 20px;
  background: linear-gradient(155deg, #0d2251 0%, #173a9e 62%, #2563eb 100%);
  box-shadow: 0 18px 44px rgba(13, 39, 105, 0.24);
}

.help-glow {
  position: absolute;
  top: -90px;
  right: -70px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.36), transparent 68%);
  pointer-events: none;
}

.help-head {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.help-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.12);
  color: #e0f2fe;
  font-size: 22px;
}

.help-head h3 {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.help-head p {
  margin-top: 6px;
  color: rgba(219, 234, 254, 0.72);
  font-size: 12.5px;
  line-height: 1.7;
}

.support-list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 22px;
}

.support-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 11px 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.07);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.support-item:hover {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.13);
}

.support-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 31px;
  height: 31px;
  border-radius: 9px;
  background: rgba(147, 197, 253, 0.18);
  color: #bfdbfe;
  font-size: 16px;
}

.support-copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.support-copy strong {
  color: #f1f6ff;
  font-size: 12.5px;
  font-weight: 600;
}

.support-copy small {
  overflow: hidden;
  color: rgba(219, 234, 254, 0.6);
  font-size: 11px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.support-action {
  flex-shrink: 0;
  color: #93c5fd;
  font-size: 11px;
  font-weight: 600;
}

.help-cta {
  position: relative;
  width: 100%;
  height: 44px;
  margin-top: 20px;
  border: none;
  background: #fff;
  color: var(--brand-dark);
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 10px 22px rgba(3, 15, 47, 0.24);
}

.help-cta:hover {
  background: #eaf2ff;
  color: var(--brand-dark);
}

.faq-list {
  min-width: 0;
}

.faq-title {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
}

.faq-num {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #eef4ff;
  color: var(--brand);
  font-size: 11.5px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.faq-question {
  overflow: hidden;
  color: var(--navy);
  font-size: 14.5px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.faq-answer {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.9;
}

.faq-list :deep(.el-collapse) {
  border-top: none;
  border-bottom: none;
}

.faq-list :deep(.el-collapse-item__header) {
  height: auto;
  min-height: 64px;
  padding: 0 20px;
  margin-bottom: 10px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  color: var(--navy);
  font-size: 14.5px;
  transition: all 0.2s ease;
}

.faq-list :deep(.el-collapse-item__header:hover) {
  border-color: #c7d9fb;
  background: #fbfdff;
}

.faq-list :deep(.el-collapse-item__header.is-active) {
  margin-bottom: 0;
  border-color: #d3e1fd;
  border-radius: 14px 14px 0 0;
  border-bottom-color: transparent;
  background: #fbfdff;
}

.faq-list :deep(.el-collapse-item__header.is-active .faq-num) {
  background: var(--brand);
  color: #fff;
}

.faq-list :deep(.el-collapse-item__arrow) {
  color: #9aa6ba;
  font-size: 14px;
}

.faq-list :deep(.el-collapse-item__wrap) {
  border: none;
  background: transparent;
}

.faq-list :deep(.el-collapse-item.is-active .el-collapse-item__wrap) {
  margin-bottom: 10px;
  border: 1px solid #d3e1fd;
  border-top: none;
  border-radius: 0 0 14px 14px;
  background: #fbfdff;
}

.faq-list :deep(.el-collapse-item__content) {
  padding: 2px 20px 20px 63px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.9;
}

@media (max-width: 960px) {
  .faq-layout {
    grid-template-columns: 1fr;
  }

  .help-card {
    max-width: none;
  }
}

@media (max-width: 640px) {
  .help-card {
    padding: 22px 18px;
  }

  .faq-list :deep(.el-collapse-item__header) {
    padding: 0 14px;
    min-height: 60px;
  }

  .faq-question {
    font-size: 13.5px;
  }

  .faq-list :deep(.el-collapse-item__content) {
    padding: 2px 14px 18px 57px;
  }
}
</style>
