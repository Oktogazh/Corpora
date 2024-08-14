<template>
  <footer class="bottom-0 flex flex-col w-full ">
    <router-link :to="{ name: 'Change Log' }">
      changelog
    </router-link>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter',
  components: {
  },
})
</script>

<style scoped>

</style>