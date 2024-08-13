<template>
  <div class="h-[100em] flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="container">
        <div
          class="w-10 h-10 bg-secondary"
          v-for="card of cardsSkeletons"
          :key="card"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  data: () => ({
    cardsSkeletons: 4,
  }),
})
</script>

<style scoped>

</style>