<template>
    <AppNavbar />
    <div class="flex">
      <RouterView />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNavbar from './components/AppNavbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppNavbar,
  },
})
</script>


<style scoped>
</style>
