<template>
  <div class="fixed top-0 pt-16 w-1/4 h-screen z-40">
    <ScrollAreaRoot
      class="h-full border-e-[1px] border-text-100 bg-background">
      <ScrollAreaViewport />
      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  </div>
</template>

<script lang="ts">
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeSidebar',
  components: {
    ScrollAreaRoot,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport
  },
  data: () => ({
    cardsSkeletons: 4,
  }),
})
</script>

<style scoped>

</style>