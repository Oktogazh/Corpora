<template>
  <div class="w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container">
        <div class="flex flex-col justify-center content-center gap-8 text-center">
          <h1 class="text-4xl mx-2 font-bold text-secondary-500">{{ $t('Log in to Corpora') }}</h1>

          <div class="flex flex-col gap-4">
            <button class="rounded-full border-[1px] border-secondary-300 p-2 w-full hover:bg-background-50 hover:border-secondary-200">
              <img
                class="absolute w-6 h-6 ms-10"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google icon">
              <span class="flex flex-row justify-center items-center gap-2 text-text-800 font-bold">
                <img class="w-6 h-6 opacity-0 ms-8">
                <span>{{ $t('Log in with Google') }}</span>
              </span>
            </button>
            <button class="rounded-full border-[1px] border-secondary-300 p-2 w-full hover:bg-background-50 hover:border-secondary-200">
              <img
                class="absolute w-6 h-6 ms-10"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google icon">
              <span class="flex flex-row justify-center items-center gap-2 text-text-800 font-bold">
                <img class="w-6 h-6 opacity-0 ms-8">
                <span>{{ $t('Log in with Google') }}</span>
              </span>
            </button>
          </div>
          <div class="h-8 w-full flex flex-row justify-center items-center">
            <Separator class="bg-secondary-200 w-full h-px">
            </Separator>
            <span class="bg-background px-2 text-secondary-500 absolute">
              {{ $t('or') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Separator } from 'radix-vue';


export default defineComponent({
  name: 'HomePage',
  components: {
    Separator
  },
  data: () => ({
  }),
})
</script>

<style scoped>

</style>