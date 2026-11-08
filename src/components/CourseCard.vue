<script setup>
import { ref } from 'vue'
import { Star, VideoPlay } from '@element-plus/icons-vue'

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])
const coverLoaded = ref(true)

const open = () => emit('select', props.course)
</script>

<template>
  <article
    class="course-card"
    tabindex="0"
    role="button"
    :aria-label="`查看课程：${course.title}`"
    @click="open"
    @keydown.enter="open"
  >
    <div
      class="cover"
      :style="{ background: `linear-gradient(135deg, ${course.coverFrom}, ${course.coverTo})` }"
    >
      <img v-if="coverLoaded" :src="course.cover" :alt="course.title" loading="lazy" @error="coverLoaded = false" />
      <span v-else class="cover-fallback">{{ course.coverLetter }}</span>
      <span v-if="course.badge" class="cover-badge" :class="course.badgeType">{{ course.badge }}</span>
      <span class="rating">
        <el-icon><Star /></el-icon>
        {{ course.rating }}
      </span>
    </div>

    <div class="card-body">
      <h3 class="course-title">{{ course.title }}</h3>

      <div class="tag-row">
        <span class="teach-tag">{{ course.focus }}</span>
      </div>

      <div class="meta-row">
        <span class="teacher">
          <span
            class="teacher-avatar"
            :style="{ background: `linear-gradient(135deg, ${course.coverFrom}, ${course.coverTo})` }"
          >
            {{ course.teacher.charAt(0) }}
          </span>
          <span class="teacher-name">{{ course.teacher }}</span>
        </span>
        <span class="lessons">
          <el-icon><VideoPlay /></el-icon>
          {{ course.lessons }} 课时
        </span>
      </div>

      <div class="price-row">
        <span class="price"><i>¥</i>{{ course.price }}<em>¥{{ course.originPrice }}</em></span>
        <span class="learners">{{ course.students }}人在学</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.course-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(15, 31, 70, 0.04);
  cursor: pointer;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.course-card:hover,
.course-card:focus-visible {
  border-color: #c7d9fb;
  box-shadow: 0 20px 42px rgba(15, 31, 70, 0.13);
  transform: translateY(-6px);
  outline: none;
}

.cover {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.course-card:hover .cover img {
  transform: scale(1.06);
}

.cover-fallback {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.9);
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.08) 0%, transparent 42%, rgba(15, 23, 42, 0.2) 100%);
  pointer-events: none;
}

.cover-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 4px 10px;
  border-radius: 8px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
}

.cover-badge.hot {
  background: linear-gradient(120deg, #fb7185, #e11d48);
}

.cover-badge.new {
  background: linear-gradient(120deg, #2563eb, #38bdf8);
}

.cover-badge.top {
  background: linear-gradient(120deg, #f59e0b, #f97316);
}

.rating {
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.5);
  color: #fff;
  font-size: 11.5px;
  font-weight: 600;
  backdrop-filter: blur(6px);
}

.rating .el-icon {
  color: #fbbf24;
  font-size: 12px;
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 17px 20px 19px;
}

.course-title {
  display: -webkit-box;
  overflow: hidden;
  min-height: 51px;
  color: var(--navy);
  font-size: 16.5px;
  font-weight: 600;
  line-height: 1.55;
  letter-spacing: 0.01em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  min-height: 24px;
}

.teach-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border: 1px solid #d6e4ff;
  border-radius: 6px;
  background: #eff5ff;
  color: #1d4ed8;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
}

.teacher {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.teacher-avatar {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.teacher-name {
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 12.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.lessons {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: var(--muted);
  font-size: 12px;
}

.lessons .el-icon {
  font-size: 13px;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed #edf1f7;
}

.price {
  color: var(--price);
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.01em;
}

.price i {
  margin-right: 1px;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
}

.price em {
  margin-left: 7px;
  color: #a5aec0;
  font-size: 11.5px;
  font-style: normal;
  font-weight: 400;
  text-decoration: line-through;
}

.learners {
  color: var(--muted);
  font-size: 11.5px;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .card-body {
    padding: 15px 16px 17px;
  }

  .course-title {
    min-height: auto;
    font-size: 15.5px;
  }
}
</style>
