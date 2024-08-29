<template>
  <AppNavbar />
  <div class="min-h-[100vh] pt-[64px] flex flex-col justify-between text-text">
    <RouterView name="default"/>
    <RouterView name="footer" />
    <ToastProvider :duration="5000">
      <ToastRoot
        v-for="(toast, i) in toasts"
        :key="i"
        v-model:open="toast.open"
        class="border-2 border-opacity-50 bg-opacity-15 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        :class="[
          toast.type === 'success' ? 'bg-green-500 border-green-500 text-green-500' :
          toast.type === 'error' ? 'bg-red-500 border-red-500 text-red-500' :
          'bg-primary-50 border-primary-500 text-primary-500' // default = info
        ]"
        >
        <ToastTitle
          class="mb-1 font-semibold text-md"
        >
          {{ toast.title }}
        </ToastTitle>
        <ToastDescription as-child>
          <span class="text-sm">
            {{ toast.message }}
          </span>
        </ToastDescription>
        <ToastAction
          v-if="toast.actionCallback && toast.actionText"
          class="[grid-area:_action]"
          as-child
          alt-text="Goto schedule to undo"
        >
          <button
            class="text-accent font-semibold"
            @click="toast.actionCallback"
          >
            {{ toast.actionText }}
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
      toasts: (state) => state.toasts
    })
  }
})
</script>

<style scoped>

</style>
