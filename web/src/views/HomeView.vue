<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-col items-center gap-4">
        <div
          class="w-full flex flex-col"
          v-if="isConnected">
          <textarea
            class="unset"
            v-model="v$.newSegment.$model"
          ></textarea>
          <div class="flex justify-end items-center gap-4">
            <span class="text-text opacity-85">
              {{ newSegment.length }}/200
            </span>
            <button
              @click="publishSegment"
              :disabled="v$.$invalid"
              class="bg-primary px-3 p-2 font-semibold rounded-full text-gray-100 disabled:opacity-75 hover:bg-primary-400"
            >
              {{ $t("Publish") }}
            </button>
          </div>
        </div>
        <Separator class="bg-secondary-200 h-px w-full"/>

        <Skeleton
          class="w-96 h-52 bg-secondary"
          v-for="card of cardsSkeletons"
          :key="card"
        ></Skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { Separator } from 'radix-vue';
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'HomeView',
  computed: {
    ...mapState(useUserStore,{
      isConnected: (state) => state.isConnected,
      user: (state) => state.user,
    }),
  },
  components: {
    Separator,
    Skeleton
  },
  data: () => ({
    newSegment: '',
    cardsSkeletons: 4,
  }),
  methods: {
    publishSegment() {
      console.log('publishSegment', this.newSegment)
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      newSegment: { required }
    }
  }
})
</script>

<style scoped>

</style>