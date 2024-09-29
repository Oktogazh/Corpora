<template>
  <footer class="bottom-0 flex flex-col items-center w-full ">
    <router-link :to="{ name: 'Changelog' }" id="changelog-link">
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