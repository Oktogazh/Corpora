<template>
  <header
    id="navbar-outer-container"
    class="fixed top-0 left-0 z-30 bg-transparent w-full h-16"
  >
    <div
      id="navbar-bg"
      class="absolute w-full h-full bg-background scrolling "
    ></div>
    <div
      id="navbar-wrapper"
      class="absolute w-full h-full bg-transparent flex items-center justify-between px-[32px]"
    >
      <div
        id="navbar-inner-container"
        class="h-full w-full py-4 flex justify-between m-auto max-w-[1300px]"
      >
        <router-link :to="{ name: 'home' }">
          <div id="title" class="flex items-center text-text">{{ appName }}</div>
        </router-link>
        <div id="navigation" class="grow flex justify-end items-center">
          <router-link :to="{ name: 'Sign In' }">
            <div class="text-text hover:text-primary transition-colors duration-300">
              {{ $t("AppNavbar.signIn")}}
            </div>
          </router-link>
          <Separator
            class="bg-secondary-100 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
            decorative
            orientation="vertical"
          />
          <SwitchRoot
            id="dark-mode-switch"
            @update:checked="switchDarkMode"
            :defaultChecked="isDarkMode"
            class="w-[44px] h-[24px] flex bg-background-100 shadow-sm rounded-full relative cursor-pointer border-[1px] border-secondary-200 hover:border-primary transition-colors duration-300"
          >
            <transition name="slide" mode="out-in">
              <SwitchThumb
                :key="isDarkMode? 'dark': 'light'"
                class="block w-[18px] h-[18px] my-auto p-auto bg-background shadow-sm rounded-full"
                :class="isDarkMode? 'translate-x-[22px]': 'translate-x-[2px]'"
              >
                <component
                  class="text-secondary-700 mt-px ml-px"
                  :is="isDarkMode? 'AnOutlinedMoon': 'AnOutlinedSun'"
                ></component>
              </SwitchThumb>
            </transition>
          </SwitchRoot>
        </div>
      </div>
    </div>
    <Separator class="bg-secondary-200 absolute bottom-0 h-px w-full"/>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Separator, SwitchRoot, SwitchThumb } from 'radix-vue';
import { AnOutlinedMoon, AnOutlinedSun } from '@kalimahapps/vue-icons';
import { useDark } from '@vueuse/core';
import { useAppStore } from '@/stores/app';
import { mapState } from 'pinia';


export default defineComponent({
  name: 'AppNavBar',
  components: {
    Separator,
    SwitchRoot,
    SwitchThumb,
    AnOutlinedMoon,
    AnOutlinedSun,
  },
  computed: {
    ...mapState(useAppStore,{
      appName: (state) => state.name,
    }),
  },
  data: () => ({
    isDarkMode: useDark({
      selector: 'body',
      attribute: 'class',
      valueDark: 'dark',
      valueLight: 'light',
    }),
  }),
  methods: {
    async switchDarkMode(val: boolean) {
      this.isDarkMode = val
    },
    handleScroll() {
      const scroll = window.scrollY;
      if (scroll === 0) {
        document.body.setAttribute('data-scroll', '0');
      } else {
        document.body.removeAttribute('data-scroll');
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  }
})
</script>

<style>
body[data-scroll="0"] {
  .scrolling{
    opacity: 50%;
    -webkit-box-shadow: none; 
    box-shadow: none;
  }

  header {
    -webkit-box-shadow: unset; 
    box-shadow: unset;
  }
}

body:not([data-scroll="0"]) {
  .scrolling{
    opacity: 100%;
    transition: all 0.5s ease-in;
  }
  header {
    transition-delay: 0.4s;
    transition: all 0.5s ease-in;
    -webkit-box-shadow: 0px -13px 13px 6px rgba(0,0,0,0.72); 
    box-shadow: 0px -13px 13px 9px rgba(0,0,0,0.72);
  }
}

/*
Transition classes
not using slide-leave-active */
.slide-enter-active {
  transition: all 0.3s ease;
}
.dark .slide-enter-from {
  transform: translateX(2px);
}
.dark .slide-enter-to {
  transform: translateX(22px);
}

.light .slide-enter-from {
  transform: translateX(22px);
}
.light .slide-enter-to {
  transform: translateX(2px);
}
</style>