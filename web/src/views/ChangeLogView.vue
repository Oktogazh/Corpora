<template>
  <div class="flex flex-col w-full ">
    <div
      class="w-full px-6 sm:px-12 lg:px-16"
    >
      <div
        class="section-container" 
        v-html="htmlChangeLog"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { marked } from 'marked'

export default defineComponent({
  name: 'ChangeLogView',
  components: {
  },
  data: () => ({
    htmlChangeLog: '',
  }),
  mounted() {
    this.loadMarkdown()
  },
  methods: {
    async loadMarkdown() {
      try {
        const response = await fetch('/CHANGELOG.md')
        const markdown = await response.text()
        this.htmlChangeLog = await marked(markdown)
      } catch (error) {
        console.error('Error loading markdown file:', error)
      }
    },
  },
})
</script>

<style scoped>
:deep(h1) {
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(h2) {
  font-size: 1.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(h3) {
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

:deep(a) {
  color: #3182ce;
}
</style>