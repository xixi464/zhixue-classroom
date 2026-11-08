<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  Promotion,
  TrendCharts,
  VideoPlay
} from '@element-plus/icons-vue'
import { hotTutorials, hotKeywords } from '../data/siteData'

const HOT_PAGE_SIZE = 5
const hotPageIndex = ref(0)
const hotPaused = ref(false)

const hotPages = computed(() => {
  const pages = []
  for (let index = 0; index < hotTutorials.length; index += HOT_PAGE_SIZE) {
    pages.push(hotTutorials.slice(index, index + HOT_PAGE_SIZE))
  }
  return pages
})

const hotRank = (pageIndex, index) => pageIndex * HOT_PAGE_SIZE + index + 1

const nextHotPage = () => {
  hotPageIndex.value = (hotPageIndex.value + 1) % hotPages.value.length
}

const prevHotPage = () => {
  hotPageIndex.value =
    (hotPageIndex.value - 1 + hotPages.value.length) % hotPages.value.length
}

let hotTimer
onMounted(() => {
  hotTimer = window.setInterval(() => {
    if (!hotPaused.value) nextHotPage()
  }, 6000)
})

onBeforeUnmount(() => {
  window.clearInterval(hotTimer)
})

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goCourses = () => scrollTo('courses')
const goRecords = () => scrollTo('records')
</script>

<template>
  <section class="hero">
    <div class="page-container">
      <div class="hero-panel">
        <div class="hero-grid"></div>
        <div class="hero-glow glow-one"></div>
        <div class="hero-glow glow-two"></div>

        <div class="hero-left">
          <span class="hero-pill">
            <i class="pulse-dot"></i>
            2026 冬季新学期 · 30+ 门新课程上线
          </span>
          <h1>让每一次学习<br /><em>都算数</em></h1>
          <p class="hero-desc">
            一线大厂讲师亲授，体系化课程搭配真实项目实战。从入门到就业，用一门课的时间，换一项拿得出手的技能。
          </p>
          <div class="hero-actions">
            <el-button type="primary" size="large" round class="hero-primary" @click="goCourses">
              开始学习
              <el-icon class="btn-icon"><ArrowRight /></el-icon>
            </el-button>
            <el-button size="large" round class="hero-ghost" @click="goRecords">
              查看学习记录
            </el-button>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <strong>300<span>+</span></strong>
              <small>精品课程</small>
            </div>
            <i class="stat-divider"></i>
            <div class="stat">
              <strong>12<span>万+</span></strong>
              <small>学员在学</small>
            </div>
            <i class="stat-divider"></i>
            <div class="stat">
              <strong>98<span>%</span></strong>
              <small>课程好评率</small>
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div
            class="hot-card"
            @mouseenter="hotPaused = true"
            @mouseleave="hotPaused = false"
          >
            <div class="hot-head">
              <div class="hot-heading">
                <el-icon><TrendCharts /></el-icon>
                <span>热门课程实时榜</span>
              </div>
              <span class="live-pill"><i></i>热播中</span>
            </div>

            <div class="hot-viewport">
              <div
                class="hot-track"
                :style="{ transform: `translateX(-${hotPageIndex * 100}%)` }"
              >
                <div v-for="(page, pageIndex) in hotPages" :key="pageIndex" class="hot-page">
                  <button
                    v-for="(item, index) in page"
                    :key="item.title"
                    type="button"
                    class="hot-row"
                    @click="goCourses"
                  >
                    <span class="hot-rank" :class="`rank-${hotRank(pageIndex, index)}`">
                      {{ hotRank(pageIndex, index) }}
                    </span>
                    <span class="hot-name">{{ item.title }}</span>
                    <span class="hot-heat">
                      <el-icon><VideoPlay /></el-icon>
                      {{ item.heat }}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div class="hot-foot">
              <span class="hot-foot-text">每小时更新 · 支持左右切换</span>
              <div class="hot-controls">
                <button
                  type="button"
                  class="hot-arrow"
                  aria-label="上一组热门课程"
                  @click="prevHotPage"
                >
                  <el-icon><ArrowLeft /></el-icon>
                </button>
                <span class="hot-counter">
                  {{ String(hotPageIndex + 1).padStart(2, '0') }} /
                  {{ String(hotPages.length).padStart(2, '0') }}
                </span>
                <button
                  type="button"
                  class="hot-arrow"
                  aria-label="下一组热门课程"
                  @click="nextHotPage"
                >
                  <el-icon><ArrowRight /></el-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hot-marquee">
        <span class="marquee-label">
          <el-icon><Promotion /></el-icon>
          热门课程
        </span>
        <div class="marquee-window">
          <div class="marquee-track">
            <div v-for="group in 2" :key="group" class="marquee-group" :aria-hidden="group === 2 ? 'true' : 'false'">
              <span v-for="word in hotKeywords" :key="`${group}-${word}`" class="marquee-item">{{ word }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 28px;
}

.hero-panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr);
  align-items: center;
  gap: 44px;
  padding: 48px 52px;
  overflow: hidden;
  border-radius: 26px;
  background: linear-gradient(122deg, #0a1c47 0%, #14349b 52%, #2563eb 100%);
  box-shadow: 0 24px 60px rgba(13, 39, 105, 0.22);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 38px 38px;
  mask-image: radial-gradient(ellipse at 70% 30%, #000 10%, transparent 72%);
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(2px);
}

.glow-one {
  top: -140px;
  right: 6%;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.32), transparent 66%);
}

.glow-two {
  bottom: -180px;
  left: 24%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(129, 140, 248, 0.28), transparent 66%);
}

.hero-left,
.hero-right {
  position: relative;
  z-index: 2;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #dbeafe;
  font-size: 12.5px;
  letter-spacing: 0.02em;
  backdrop-filter: blur(6px);
}

.pulse-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.18);
}

.hero-left h1 {
  margin-top: 20px;
  color: #fff;
  font-size: 46px;
  font-weight: 800;
  letter-spacing: 0.01em;
  line-height: 1.26;
}

.hero-left h1 em {
  font-style: normal;
  background: linear-gradient(96deg, #7dd3fc 0%, #a5b4fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  max-width: 520px;
  margin-top: 18px;
  color: rgba(226, 238, 255, 0.8);
  font-size: 14.5px;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
}

.hero-actions :deep(.el-button) {
  height: 46px;
  padding: 0 26px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 999px;
}

.hero-actions :deep(.hero-primary) {
  border-color: #fff;
  background: #fff;
  color: var(--brand-dark);
  box-shadow: 0 10px 24px rgba(3, 15, 47, 0.24);
}

.hero-actions :deep(.hero-primary:hover) {
  border-color: #e8f1ff;
  background: #e8f1ff;
  color: var(--brand-dark);
  transform: translateY(-1px);
}

.hero-actions :deep(.hero-ghost) {
  border-color: rgba(255, 255, 255, 0.34);
  background: rgba(255, 255, 255, 0.08);
  color: #eaf2ff;
}

.hero-actions :deep(.hero-ghost:hover) {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

.btn-icon {
  margin-left: 4px;
  font-size: 15px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-top: 32px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat strong {
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;
}

.stat strong span {
  margin-left: 1px;
  color: #93c5fd;
  font-size: 13px;
  font-weight: 600;
}

.stat small {
  color: rgba(203, 221, 255, 0.62);
  font-size: 12px;
  letter-spacing: 0.02em;
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.16);
}

.hot-card {
  width: 100%;
  max-width: 430px;
  margin-left: auto;
  padding: 20px 22px 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.06));
  box-shadow: 0 20px 50px rgba(3, 14, 45, 0.3);
  backdrop-filter: blur(16px);
}

.hot-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.hot-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f0f6ff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.hot-heading .el-icon {
  color: #7dd3fc;
  font-size: 17px;
}

.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.16);
  color: #86efac;
  font-size: 11px;
  font-weight: 600;
}

.live-pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.18);
  animation: livePulse 1.8s ease-in-out infinite;
}

@keyframes livePulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

.hot-viewport {
  height: 270px;
  margin-top: 6px;
  overflow: hidden;
}

.hot-track {
  display: flex;
  width: 100%;
  transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}

.hot-page {
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
}

.hot-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 54px;
  padding: 0 8px;
  border: none;
  border-radius: 10px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.hot-row:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hot-rank {
  flex-shrink: 0;
  width: 20px;
  color: #a5b4fc;
  font-size: 14px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.hot-rank.rank-1 {
  color: #fca5a5;
}

.hot-rank.rank-2 {
  color: #fdba74;
}

.hot-rank.rank-3 {
  color: #fcd34d;
}

.hot-name {
  flex: 1;
  overflow: hidden;
  color: #e8f1ff;
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-heat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: rgba(203, 221, 255, 0.6);
  font-size: 11px;
}

.hot-heat .el-icon {
  font-size: 12px;
}

.hot-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 9px;
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
}

.hot-foot-text {
  overflow: hidden;
  color: rgba(203, 221, 255, 0.48);
  font-size: 10.5px;
  letter-spacing: 0.02em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.hot-arrow {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: #dbeafe;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hot-arrow:hover {
  border-color: rgba(255, 255, 255, 0.42);
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.hot-counter {
  min-width: 46px;
  color: rgba(203, 221, 255, 0.65);
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.06em;
  text-align: center;
}

.hot-marquee {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 56px;
  margin-top: 20px;
  padding: 0 20px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  box-shadow: var(--card-shadow);
}

.marquee-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  color: var(--brand);
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.marquee-label::before {
  content: '';
  width: 3px;
  height: 16px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--brand), #60a5fa);
}

.marquee-label .el-icon {
  font-size: 15px;
}

.marquee-window {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 36s linear infinite;
}

.marquee-window:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 42px;
  padding-right: 42px;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--text-secondary);
  font-size: 13px;
  white-space: nowrap;
}

.marquee-item::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #bfdbfe;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1180px) {
  .hero-panel {
    gap: 32px;
    padding: 40px 38px;
  }

  .hero-left h1 {
    font-size: 42px;
  }

  .hot-card {
    padding: 18px 18px 14px;
  }
}

@media (max-width: 940px) {
  .hero-panel {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-left h1 {
    font-size: 40px;
  }

  .hot-card {
    max-width: none;
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 16px;
  }

  .hero-panel {
    padding: 28px 22px;
    border-radius: 20px;
  }

  .hero-left h1 {
    margin-top: 16px;
    font-size: 31px;
  }

  .hero-desc {
    font-size: 13.5px;
  }

  .hero-actions {
    flex-wrap: wrap;
    margin-top: 22px;
  }

  .hero-actions :deep(.el-button) {
    height: 42px;
    padding: 0 20px;
  }

  .hero-stats {
    gap: 16px;
    margin-top: 24px;
  }

  .stat strong {
    font-size: 20px;
  }

  .hot-card {
    padding: 16px 14px 12px;
  }

  .hot-heat {
    display: none;
  }

  .hot-marquee {
    gap: 12px;
    padding: 0 14px;
  }

  .marquee-group {
    gap: 28px;
    padding-right: 28px;
  }
}
</style>
