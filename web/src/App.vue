<template>
    <AppNavbar />
    <div class="flex mt-[64px]"></div>
    <RouterView />
    <RouterView name="footer" />
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
