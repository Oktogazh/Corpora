<template>
  <div class="w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex items-center justify-center">
        <div class="flex flex-col justify-center items-center gap-8 text-center">
          <h1 class="text-4xl mx-2 font-bold text-text-900">
            {{ $t('Log in to Corpora') }}
          </h1>

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
            <span class="bg-background px-2 text-secondary-500 absolute">
              {{ $t('or') }}
            </span>
          </div>
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
                type="email"
                :placeholder="$t('Email or username')"
                v-model="emailOrUsername">
            </div>
            <div>
              <label
                class="flex flex-col text-start font-semibold text-sm mb-2"
                for="email-or-username">
                {{ $t('Password') }}
              </label>
              <div class="flex flex-row items-center">
                <input
                  id="password"
                  class="w-full border-[1px] border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200 pe-8"
                  :type="showPassword? 'text': 'password'"
                  :placeholder="$t('Password')"
                  v-model="password">
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
            <button
              class="w-72 bg-primary text-background font-semibold p-2 rounded-full hover:bg-primary-500 mt-4"
              @click="loginWithPassword">
              {{ $t('Log In (action button)') }}
            </button>
            <router-link
              :to="{ name: 'Forgot Password' }"
              class="text-text hover:text-text-500 underline">
              {{ $t('Forgot password?') }}
            </router-link>
          </div>

          <div class="h-8 w-full flex flex-row justify-center items-center">
            <Separator class="bg-secondary-200 w-full h-px">
            </Separator>
          </div>
          <span class="text-text-500">
            {{ $t("Don't have an account yet?") }}

            <router-link
              :to="{ name: 'Sign Up' }"
              class="text-text hover:text-text-500 underline">
              {{ $t("Sign up for Corpora") }}
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Separator } from 'radix-vue';
import { BsEye, BsEyeSlash } from '@kalimahapps/vue-icons';
import { auth, googleProvider, facebookProvider, db } from '@/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUserStore } from '@/stores/user';
import { mapState } from 'pinia';


export default defineComponent({
  name: 'LogInView',
  components: {
    Separator,
    BsEye,
    BsEyeSlash
  },
  computed: {
    ...mapState(useUserStore,{
      isConnected: (state) => state.isConnected,
      user: (state) => state.user,
    }),
  },
  data: () => ({
    nextRoute: null as any,
    emailOrUsername: '',
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
    async loginWithPassword() {
      await signInWithEmailAndPassword(auth, this.emailOrUsername, this.password)
    }
  },
  created() {
    if (this.isConnected) {
      this.$router.push({name: 'Home'});
    }
  },
  watch: {
    isConnected(isConnected) {
      if (this.user) {
        console.log('this.user', JSON.stringify(this.user.createdAt))
        const { createdAt, displayName, uid } = this.user!
        const creationTime = new Date(Number(createdAt)).getTime();
        const now = new Date().getTime();
        // look if account was created less than 10 seconds ago
        // to claim the username if it is the first time the user logs in
        if ((now - creationTime) < 10000 && displayName) {
          try {
            const uniqueUsernameRef = doc(db, "unique_usernames", displayName )
            setDoc(uniqueUsernameRef, { owner: uid, createdAt: serverTimestamp() })
          } catch (error) {
            console.error('Error setting displayName, the username might be already taken:', error)
          }
        }
        const { previousRoute, options } = this.$router;
        (previousRoute && options.routes.some(({ path }) => path === previousRoute.path))
          ? this.$router.push(previousRoute)
          : this.$router.push({name: 'Home'});
      }
    }
  },
})
</script>

<style scoped>

</style>