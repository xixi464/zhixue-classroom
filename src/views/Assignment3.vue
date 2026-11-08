<script setup>
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/HeroSection.vue'
import CourseSection from '../components/CourseSection.vue'
import LearningRecords from '../components/LearningRecords.vue'
import FaqSection from '../components/FaqSection.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <div class="assignment-page">
    <AppHeader />
    <main>
      <HeroSection />
      <CourseSection />
      <LearningRecords />
      <FaqSection />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.assignment-page {
  min-height: 100vh;
}

.assignment-page > main {
  padding-bottom: 8px;
}
</style>
