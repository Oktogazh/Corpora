<template>
  <AppNavbar />
  <RouterView name="sidebar"/>
  <div class="min-h-[100vh] pt-[64px] flex flex-col justify-between text-text">
    <RouterView name="default"/>
    <RouterView name="footer" />
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
