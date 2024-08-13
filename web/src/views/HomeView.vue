<template>
  <div class="h-[100em] flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-row justify-between">
        <Skeleton
          class="w-64 h-52 bg-secondary"
          v-for="card of cardsSkeletons"
          :key="card"
        ></Skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Skeleton
  },
  data: () => ({
    cardsSkeletons: 4,
  }),
})
</script>

<style scoped>

</style>