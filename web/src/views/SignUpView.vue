<template>
  <div class="w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div
        class="section-container flex flex-col items-center justify-center">
        <div
          v-if="step === 0"
          class="flex flex-col justify-center items-center gap-8 text-center">
          <h1 class="text-4xl mx-2 font-bold text-text-900">
            {{ $t('Sign up') }}
          </h1>

          <div class="flex flex-col justify-center gap-4 w-fit">
            <div>
              <label
                class="flex flex-col text-start font-semibold text-sm mb-2"
                for="email-or-username">
                {{ $t('Email or username') }}
              </label>
              <input
                id="email-or-user-name"
                class="w-full border-[1px] border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200"
                type="text"
                :placeholder="$t('Email or username')"
                :v-model="email">
            </div>
            <button
              class="w-72 bg-primary text-background font-semibold p-2 rounded-full hover:bg-primary-500 mt-4"
              @click="step = 1">
              {{ $t('Next') }}
            </button>
          </div>
          <div class="h-8 w-full flex flex-row justify-center items-center">
            <Separator class="bg-secondary-200 w-full h-px">
            </Separator>
            <span class="bg-background px-2 text-secondary-500 absolute">
              {{ $t('or') }}
            </span>
          </div>

          <div class="flex flex-col gap-4 w-72 mx-10">
            <button
              @click="loginWith(button.name)"
              class="rounded-full border-[1px] border-secondary-300 p-2 w-full hover:bg-background-50 hover:border-secondary-200"
              v-for="(button, i) in loginButtons"
              :key="i">
              <img
                class="absolute w-6 h-6 ms-10"
                :src="button.icon"
                :alt="button.alt">
              <span class="flex flex-row justify-center items-center gap-2 text-text-800 font-bold">
                <img class="w-6 h-6 opacity-0 ms-8">
                <span>{{ $t(button.text) }}</span>
              </span>
            </button>
          </div>
          <div class="h-8 w-full flex flex-row justify-center items-center">
            <Separator class="bg-secondary-200 w-full h-px">
            </Separator>
          </div>
          <span class="text-text-500">
            {{ $t("Already have an account?") }}

            <router-link
              :to="{ name: 'Log In' }"
              class="text-text hover:text-text-500 underline">
              {{ $t("Log in here") }}
            </router-link>
          </span>
        </div>
      <div
        v-else
        class="section-container flex flex-col items-center justify-center">
        <div
          class="flex flex-col items-center justify-center">
          <div>

          </div>
          <SliderRoot
            :modelValue="[step]"
            class="relative flex items-center select-none touch-none h-5 w-full"
            :max="3"
            :step="1"
            disabled
          >
            <SliderTrack class="bg-secondary relative grow rounded-full h-[3px]">
              <SliderRange class="absolute bg-primary rounded-full h-full" />
            </SliderTrack>
          </SliderRoot>
          <div>
            <label
              class="flex flex-col text-start font-semibold text-sm mb-2"
              for="email-or-username">
              {{ $t('Password') }}
            </label>
            <div class="flex flex-row items-center">
              <input
                id="password"
                class="border-[1px] border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200 pe-8"
                :type="showPassword? 'text': 'password'"
                :placeholder="$t('Password')"
                :v-model="password">
              <div>
                <BsEye
                  v-if="!showPassword"
                  class="transform absolute -translate-x-full -translate-y-1/2 -ms-2 font-bold cursor-pointer"
                  @click="showPassword = true"
                />
                <BsEyeSlash
                  v-else
                  class="transform absolute -translate-x-full -translate-y-1/2 -ms-2 font-bold cursor-pointer"
                  @click="showPassword = false"
                />
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Separator, SliderRange, SliderRoot, SliderTrack } from 'radix-vue';
import { BsEye, BsEyeSlash } from '@kalimahapps/vue-icons';
import { auth, googleProvider, facebookProvider } from '@/firebase';
import { signInWithPopup } from "firebase/auth";
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';


export default defineComponent({
  name: 'SignUpView',
  components: {
    Separator,
    BsEye,
    BsEyeSlash,
    SliderRange,
    SliderRoot,
    SliderTrack
  },
  computed: {
    ...mapState(useUserStore,{
      isConnected: (state) => state.isConnected,
    })
  },
  data: () => ({
    step: 0,
    email: '',
    username: '',
    password: '',
    showPassword: false,
    loginButtons: [
      {
        name: 'google',
        alt: 'Google icon',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
        text: 'Log in with Google'
      }
      /* TODO: Add the Data deletion url and Privacy Policy URLs
        https://developers.facebook.com/apps/1166923014592622/go_live/?business_id=147001963459612
      ,
      {
        name: 'facebook',
        alt: 'Facebook icon',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg',
        text: 'Log in with Facebook'
      }, */
    ]
  }),
  methods: {
    loginWith(provider: string) {
      switch (provider) {
        case 'google':
          this.loginWithGoogle();
          break;
        case 'facebook':
          this.loginWithFacebook();
          break;
        default:
          console.error('Unknown provider:', provider);
      }
    },
    async loginWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    },
    async loginWithFacebook() {
      try {
        await signInWithPopup(auth, facebookProvider);
      } catch (error) {
        console.error("Error signing in with Facebook:", error);
      }
    },
    loginWithPassword() {
    }
  },
  created() {
    if (this.isConnected) {
      this.$router.push({name: 'Home'});
    }
  },
  watch: {
    isConnected(isConnected) {
      if (isConnected) {
        try {
          this.$router.go(-1)
        } catch (error) {
          this.$router.push({name: 'Home'});
        }
      }
    }
  },
})
</script>

<style scoped>

</style>