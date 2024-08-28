<template>
  <AppNavbar />
  <RouterView name="sidebar"/>
  <div class="min-h-[100vh] pt-[64px] flex flex-col justify-between text-text">
    <RouterView name="default"/>
    <RouterView name="footer" />
    <ToastProvider>
      <ToastRoot
        v-model:open="toast.open"
        class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      >
        <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          {{ toast.title }}
        </ToastTitle>
        <ToastDescription as-child>
          <time
            class="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
          >
            {{ toast.message }}
          </time>
        </ToastDescription>
        <ToastAction
          class="[grid-area:_action]"
          as-child
          alt-text="Goto schedule to undo"
        >
          <button class="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
            Undo
          </button>
        </ToastAction>
      </ToastRoot>
      <ToastViewport class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </ToastProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppNavbar from './components/AppNavbar.vue'
import { mapState } from 'pinia';
import { useAppStore } from '@/stores/app';
import {
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport
 } from 'radix-vue';

export default defineComponent({
  name: 'App',
  components: {
    AppNavbar,
    ToastAction,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastViewport
  },
  computed: {
    ...mapState(useAppStore, {
      toast: (state) => state.toast
    })
  }
})
</script>

<style scoped>

</style>
