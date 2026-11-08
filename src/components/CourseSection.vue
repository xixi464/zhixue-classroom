<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import CourseCard from './CourseCard.vue'
import { categories, courses } from '../data/siteData'

const filters = ['全部', ...categories]
const activeFilter = ref('全部')
const columns = ref(3)
const viewportEl = ref(null)
const gridEl = ref(null)
const viewportMaxHeight = ref(0)
const showScrollHint = ref(false)

const filteredCourses = computed(() =>
  activeFilter.value === '全部' ? courses : courses.filter((item) => item.category === activeFilter.value)
)

const filterCount = (name) =>
  name === '全部' ? courses.length : courses.filter((item) => item.category === name).length

const updateColumns = () => {
  if (window.innerWidth < 640) {
    columns.value = 1
  } else if (window.innerWidth < 920) {
    columns.value = 2
  } else {
    columns.value = 3
  }
}

const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
const initialFilter = params.get('filter')
if (initialFilter && filters.includes(initialFilter)) {
  activeFilter.value = initialFilter
}

const measure = () => {
  const grid = gridEl.value
  if (!grid) return
  const card = grid.querySelector('.course-card')
  if (!card) {
    viewportMaxHeight.value = 0
    showScrollHint.value = false
    return
  }
  const gap = parseFloat(getComputedStyle(grid).rowGap) || 0
  const totalRows = Math.ceil(filteredCourses.value.length / columns.value)
  const visibleRows = Math.min(2, totalRows)
  const cardHeight = card.getBoundingClientRect().height
  viewportMaxHeight.value = Math.round(cardHeight * visibleRows + gap * (visibleRows - 1) + 14)
  showScrollHint.value = totalRows > visibleRows
}

const resetViewport = () => {
  nextTick(() => {
    measure()
    if (viewportEl.value) viewportEl.value.scrollTop = 0
  })
}

watch(activeFilter, resetViewport)
watch(columns, resetViewport)

const selectCourse = (course) => {
  ElMessage({
    message: `正在打开《${course.title}》课程详情页`,
    type: 'success',
    duration: 2600
  })
}

let resizeObserver

onMounted(() => {
  updateColumns()
  window.addEventListener('resize', updateColumns)
  nextTick(measure)
  if (typeof ResizeObserver !== 'undefined' && gridEl.value) {
    resizeObserver = new ResizeObserver(() => measure())
    resizeObserver.observe(gridEl.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumns)
  resizeObserver?.disconnect()
})
</script>

<template>
  <section id="courses" class="section courses-section">
    <div class="page-container">
      <div class="section-head">
        <div>
          <span class="eyebrow">Curated Courses</span>
          <h2 class="section-title">精选课程</h2>
          <p class="section-sub">体系化课程搭配真实项目演练，选择方向，学完就能用在工作里</p>
        </div>
      </div>

      <div class="course-toolbar">
        <div class="filter-pills" role="tablist" aria-label="课程分类筛选">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            role="tab"
            class="filter-pill"
            :class="{ active: activeFilter === filter }"
            :aria-selected="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ filter }}
            <span class="pill-count">{{ filterCount(filter) }}</span>
          </button>
        </div>
        <span class="result-count">共 {{ filteredCourses.length }} 门课程</span>
      </div>

      <div
        ref="viewportEl"
        class="course-viewport"
        :style="viewportMaxHeight ? { maxHeight: `${viewportMaxHeight}px` } : null"
        tabindex="0"
        aria-label="精选课程列表，可使用鼠标滚轮上下滑动查看更多"
      >
        <div
          ref="gridEl"
          class="course-grid"
          :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
        >
          <CourseCard
            v-for="course in filteredCourses"
            :key="course.id"
            :course="course"
            @select="selectCourse"
          />
        </div>
      </div>

      <p v-if="showScrollHint" class="scroll-hint">
        <span class="hint-wheel"></span>
        向下滚动鼠标滚轮，查看更多课程
      </p>
    </div>
  </section>
</template>

<style scoped>
.courses-section {
  scroll-margin-top: 96px;
}

.course-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 17px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #fff;
  color: var(--text-secondary);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-pill:hover {
  border-color: #bfd3fb;
  color: var(--brand);
}

.filter-pill.active {
  border-color: var(--brand);
  background: var(--brand);
  color: #fff;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.24);
}

.pill-count {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #f2f5fb;
  color: #8a95a8;
  font-size: 10.5px;
  font-weight: 700;
  line-height: 1;
}

.filter-pill.active .pill-count {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.result-count {
  flex-shrink: 0;
  color: var(--muted);
  font-size: 12.5px;
}

.course-viewport {
  margin-top: 26px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-radius: 18px;
  scrollbar-width: thin;
  scrollbar-color: #c3d3ef transparent;
}

.course-viewport:focus-visible {
  outline: 2px solid #bfd3fb;
  outline-offset: 4px;
}

.course-viewport::-webkit-scrollbar {
  width: 6px;
}

.course-viewport::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #c3d3ef;
}

.course-viewport::-webkit-scrollbar-thumb:hover {
  background: #9db4de;
}

.course-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.course-grid {
  display: grid;
  gap: 22px;
  padding: 6px 2px 8px;
  align-items: stretch;
}

.scroll-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  color: var(--muted);
  font-size: 12.5px;
}

.hint-wheel {
  position: relative;
  width: 16px;
  height: 24px;
  border: 1.5px solid #c3d3ef;
  border-radius: 999px;
}

.hint-wheel::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 50%;
  width: 4px;
  height: 7px;
  border-radius: 999px;
  background: var(--brand);
  transform: translateX(-50%);
  animation: wheelMove 1.8s ease-in-out infinite;
}

@keyframes wheelMove {
  0%,
  100% {
    opacity: 0;
    transform: translate(-50%, 0);
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0;
    transform: translate(-50%, 7px);
  }
}

@media (max-width: 768px) {
  .course-toolbar {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .result-count {
    align-self: flex-end;
  }

  .course-grid {
    gap: 16px;
  }
}
</style>
