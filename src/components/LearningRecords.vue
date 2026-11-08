<script setup>
import { ElMessage } from 'element-plus'
import { ArrowRight, Clock } from '@element-plus/icons-vue'
import { learningRecords } from '../data/siteData'

const statusClass = {
  学习中: 'learning',
  待继续: 'pending',
  已完成: 'done'
}

const progressColor = (percent) => {
  if (percent >= 100) return '#22c55e'
  if (percent >= 60) return '#2563eb'
  if (percent >= 40) return '#60a5fa'
  return '#f59e0b'
}

const continueLearn = (row) => {
  ElMessage({
    message: `继续学习《${row.title}》· ${row.chapter}`,
    type: 'success',
    duration: 2600
  })
}

const viewAll = () => {
  ElMessage.info('正在跳转到完整学习记录页')
}
</script>

<template>
  <section id="records" class="section records-section">
    <div class="page-container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Learning Progress</span>
          <h2 class="section-title">我的学习记录</h2>
          <p class="section-sub">保持学习的节奏，每一次坚持都会留下痕迹</p>
        </div>
        <div class="records-head-actions">
          <span class="week-chip">
            <el-icon><Clock /></el-icon>
            本周已学习 <strong>4.5</strong> 小时
          </span>
          <el-button text class="all-link" @click="viewAll">
            查看全部
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>

      <div class="records-card">
        <div class="records-scroll">
          <div class="records-table" role="table" aria-label="我的学习记录">
            <div class="table-head" role="row">
              <span class="head-index" role="columnheader">序号</span>
              <span role="columnheader">课程名称</span>
              <span role="columnheader">当前章节</span>
              <span role="columnheader">学习进度</span>
              <span role="columnheader">状态</span>
              <span class="head-action" role="columnheader">操作</span>
            </div>

            <div
              v-for="(row, index) in learningRecords"
              :key="row.id"
              class="table-row"
              role="row"
            >
              <div class="cell index-cell" role="cell">
                <span class="index-badge" :class="{ top: index < 3 }">{{ index + 1 }}</span>
              </div>

              <div class="cell course-cell" role="cell">
                <span
                  class="course-thumb"
                  :style="{ background: `linear-gradient(135deg, ${row.coverFrom}, ${row.coverTo})` }"
                >
                  {{ row.letter }}
                </span>
                <div class="course-copy">
                  <span class="course-name" :title="row.title">{{ row.title }}</span>
                  <span class="course-teacher">讲师 · {{ row.teacher }}</span>
                </div>
              </div>

              <div class="cell chapter-cell" role="cell">
                <span class="chapter-name">{{ row.chapter }}</span>
                <span class="chapter-updated">{{ row.updated }}</span>
              </div>

              <div class="cell progress-cell" role="cell">
                <el-progress
                  :percentage="row.progress"
                  :stroke-width="8"
                  :show-text="false"
                  :color="progressColor(row.progress)"
                />
                <span class="progress-num">{{ row.progress }}%</span>
              </div>

              <div class="cell" role="cell">
                <span class="status-pill" :class="statusClass[row.status]">
                  <i></i>{{ row.status }}
                </span>
              </div>

              <div class="cell action-cell" role="cell">
                <el-button
                  class="continue-btn"
                  type="primary"
                  plain
                  round
                  size="small"
                  @click="continueLearn(row)"
                >
                  继续学习
                  <el-icon class="el-icon--right"><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.records-section {
  scroll-margin-top: 96px;
}

.records-head-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.week-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 15px;
  border: 1px solid #e3ebfa;
  border-radius: 999px;
  background: #f4f8ff;
  color: var(--text-secondary);
  font-size: 12.5px;
}

.week-chip .el-icon {
  color: var(--brand);
  font-size: 14px;
}

.week-chip strong {
  color: var(--brand);
  font-size: 14px;
  font-weight: 700;
}

.all-link {
  color: var(--brand);
  font-size: 13px;
  font-weight: 600;
}

.all-link:hover {
  color: var(--brand-dark);
}

.records-card {
  margin-top: 26px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: #fff;
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.records-scroll {
  overflow-x: auto;
}

.records-table {
  --table-cols: 58px minmax(0, 2.2fr) minmax(0, 1.6fr) minmax(150px, 1.25fr) 96px 132px;
  min-width: 860px;
  padding: 6px 8px 5px;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: var(--table-cols);
  align-items: center;
  padding: 0 12px;
}

.table-head {
  min-height: 48px;
  border-bottom: 1px solid #eef2f9;
  color: #8c97aa;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.head-index {
  text-align: center;
}

.head-action {
  text-align: right;
}

.table-row {
  min-height: 80px;
  border-bottom: 1px solid #f2f5fa;
  transition: background 0.2s ease;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f8fbff;
}

.cell {
  min-width: 0;
}

.index-cell {
  display: flex;
  justify-content: center;
}

.index-badge {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 9px;
  background: #f3f6fc;
  color: #8793a8;
  font-size: 12.5px;
  font-weight: 700;
}

.index-badge.top {
  background: #e9f0fe;
  color: var(--brand);
}

.course-cell {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 18px;
}

.course-thumb {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.02em;
  box-shadow: 0 6px 14px rgba(15, 31, 70, 0.14);
}

.course-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.course-name {
  overflow: hidden;
  color: var(--text);
  font-size: 13.5px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.course-teacher {
  color: var(--muted);
  font-size: 11.5px;
}

.chapter-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 16px;
}

.chapter-name {
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 13px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.chapter-updated {
  color: #a3adc0;
  font-size: 11.5px;
}

.progress-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 18px;
}

.progress-cell :deep(.el-progress) {
  flex: 1;
  min-width: 0;
}

.progress-cell :deep(.el-progress-bar__outer) {
  border-radius: 999px;
  background: #eef2f9;
}

.progress-cell :deep(.el-progress-bar__inner) {
  border-radius: 999px;
}

.progress-num {
  flex-shrink: 0;
  width: 36px;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}

.status-pill i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.status-pill.learning {
  background: #eef4ff;
  color: #1d4ed8;
}

.status-pill.learning i {
  background: #2563eb;
}

.status-pill.pending {
  background: #fff7ed;
  color: #c2620d;
}

.status-pill.pending i {
  background: #f59e0b;
}

.status-pill.done {
  background: #ecfdf5;
  color: #047857;
}

.status-pill.done i {
  background: #10b981;
}

.action-cell {
  display: flex;
  justify-content: flex-end;
}

.continue-btn {
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .records-head-actions {
    flex-wrap: wrap;
  }
}

@media (max-width: 640px) {
  .records-head-actions {
    width: 100%;
    justify-content: space-between;
  }

  .week-chip {
    padding: 8px 12px;
  }

  .records-table {
    min-width: 820px;
  }

  .table-head,
  .table-row {
    padding: 0 8px;
  }

  .table-row {
    min-height: 74px;
  }
}
</style>
