<template>
  <div
    class="w-full ">
    <div
      class="w-full px-6 sm:px-12 lg:px-16">
      <div
        class="section-container flex flex-col items-center justify-center">
        <div
          v-if="step === 1"
          class="flex flex-col justify-center items-center gap-8 text-center">
          <h1
            class="text-4xl mx-2 font-bold text-text-900">
            {{ $t('Sign up') }}
          </h1>

          <div
            class="flex flex-col justify-center gap-4 w-fit">
            <div>
              <label
                class="flex flex-col text-start font-medium text-sm mb-2"
                for="email">
                {{ $t('Email') }}
              </label>
              <input
                id="email"
                class="w-full border-[1px] border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200"
                type="text"
                :placeholder="$t('Email')"
                v-model="v$.email.$model">
            </div>
            <button
              :disabled="v$.email.$invalid"
              class="w-72 bg-primary disabled:bg-primary-300 text-background font-medium p-2 rounded-full hover:bg-primary-500 mt-4"
              @click="++step">
              {{ $t('Next') }}
            </button>
          </div>
          <div
            class="h-8 w-full flex flex-row justify-center items-center">
            <Separator class="bg-secondary-200 w-full h-px">
            </Separator>
            <span class="bg-background px-2 text-secondary-500 absolute">
              {{ $t('or') }}
            </span>
          </div>

          <div
            class="flex flex-col gap-4 w-72 mx-10">
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
          <div
            class="h-8 w-full flex flex-row justify-center items-center">
            <Separator class="bg-secondary-200 w-full h-px">
            </Separator>
          </div>
          <span
            class="text-text-500">
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
            class="flex flex-col items-center justify-between gap-4">
            <div>
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
              <div
                class="flex w-full p-2">
                <button>
                  <AkChevronLeft
                    @click="--step"
                    class="font-bold text-3xl"/>
                </button>
                <div
                  class="flex flex-col mx-4 text-text font-bold">
                  <span class="text-text-500 font-medium">{{ $tc("Step {n} of 3", step) }}</span>
                  <v-switch class="" :case="step">
                    <template #2>{{ $t("Create a password") }}</template>
                    <template #3>{{ $t("Create a username") }}</template>
                  </v-switch>
                  <div
                    class="flex">
                    <input class="h-0 pe-8">
                    <AkChevronLeft
                      class="font-bold text-3xl h-0  mx-5"/>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="form-container"
              class="flex flex-col gap-2">
              <v-switch :case="step">
                <template #2>
                  <label
                    class="flex flex-col text-start font-medium text-sm"
                    for="password">
                    {{ $t('Password') }}
                  </label>
                  <div
                    class="flex flex-row items-center mb-2">
                    <input
                      name="password"
                      class="border-[1px] w-full border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200 pe-8"
                      :type="showPassword? 'text': 'password'"
                      :placeholder="$t('Password')"
                      v-model="v$.password.$model">
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
                  <div class="flex flex-col gap-2 text-xs">
                    <span
                      class="font-medium text-sm">{{ $t("Your password must contain at least") }}</span>
                    <span
                      class="flex gap-2">
                      <AkCircle v-if="v$.password.hasLetter.$invalid"/>
                      <AnFilledCheckCircle class="text-accent" v-else/>
                      {{ $t("1 letter") }}
                    </span>
                    <span
                      class="flex gap-2 align-baseline">
                      <AkCircle v-if="v$.password.numberOrSpecial.$invalid"/>
                      <AnFilledCheckCircle class="text-accent" v-else/>
                      {{ $t("1 number or special character (example: # ? ! &)") }}
                    </span>
                    <span
                      class="flex gap-2 align-baseline">
                      <AkCircle v-if="v$.password.minLength.$invalid"/>
                      <AnFilledCheckCircle class="text-accent" v-else/>
                      {{ $t("10 characters") }}
                    </span>
                  </div>
                  <button
                    :disabled="v$.password.$invalid"
                    class="w-72 bg-primary text-background font-medium p-2 rounded-full hover:bg-primary-500 mt-4 disabled:bg-primary-300"
                    @click="++step">
                    {{ $t('Next') }}
                  </button>
                </template>

                <template #3>
                  <label
                    class="flex flex-col text-start font-medium text-sm mb-2"
                    for="username">
                    {{ $t('Username') }}
                  </label>
                  <div
                    class="flex flex-row items-center">
                    <input
                      name="username"
                      class="border-[1px] w-full border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200"
                      :placeholder="$t('Username')"
                      v-model="v$.username.$model">
                  </div>
                  <div class="flex flex-col gap-2 text-xs">
                    <span
                      class="font-medium text-sm">{{ $t("Your password must contain at least") }}</span>
                    <span
                      class="flex gap-2 align-baseline">
                      <AkCircle v-if="v$.username.minLength.$invalid"/>
                      <AnFilledCheckCircle class="text-accent" v-else/>
                      {{ $t("3 characters") }}
                    </span>
                    <span
                      class="flex gap-2">
                      <AkCircle v-if="!usernameAvailable"/>
                      <AnFilledCheckCircle class="text-accent" v-else/>
                      {{ $t("Available username") }}
                    </span>
                  </div>
                  <button
                    :disabled="v$.username.$invalid || !usernameAvailable"
                    class="w-72 bg-primary text-background font-medium p-2 rounded-full hover:bg-primary-500 mt-4 transition-colors delay-150 duration-150 disabled:bg-primary-300"
                    @click="signUpWithPwd">
                    {{ $t("Sign Up (action button)") }}
                  </button>
                </template>
              </v-switch>
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
import { BsEye, BsEyeSlash, AkChevronLeft, AnFilledCheckCircle, AkCircle } from '@kalimahapps/vue-icons';
import { auth, db, googleProvider, facebookProvider } from '@/firebase';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile, type AuthError } from "firebase/auth";
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import { mapState } from 'pinia';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'



export default defineComponent({
  name: 'SignUpView',
  components: {
    AkChevronLeft,
    AkCircle,
    AnFilledCheckCircle,
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
      user: (state) => state.user,
    })
  },
  data: () => ({
    step: 1 as 1|2|3,
    email: '',
    username: '',
    password: '',
    showPassword: false,
    usernameAvailable: false,
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
    ],
    unsubscribeUniqueUsername: null as null | Function
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
    async createAccountAndRedirect() {
      console.log('Creating account and redirecting');
    },
    async loginWithGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        const errorCode = (error as AuthError).code;
        const { $t } = this;
        useAppStore().toasts.push({
          actionCallback: null,
          actionText: "",
          title: $t("Error"),
          open: true,
          message: $t(errorCode),
          type: "error"
        })
      }
    },
    async loginWithFacebook() {
      try {
        await signInWithPopup(auth, facebookProvider);
      } catch (error) {
        const errorCode = (error as AuthError).code;
        const { $t } = this;
        useAppStore().toasts.push({
          actionCallback: null,
          actionText: "",
          title: $t("Error"),
          open: true,
          message: $t(errorCode),
          type: "error"
        })
      }
    },
    async signUpWithPwd() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
      } catch (error) {
        const errorCode = (error as AuthError).code;
        const { $t } = this;
        useAppStore().toasts.push({
          actionCallback: null,
          actionText: "",
          title: $t("Error"),
          open: true,
          message: $t(errorCode),
          type: "error"
        })
      }
    },
    async updateValidator(value: string) {
      this.usernameAvailable = false
      if (value.length < 3) return
      const self = this
      
      if (this.unsubscribeUniqueUsername !== null) this.unsubscribeUniqueUsername()

      const docRef = doc(db, "unique_usernames", value)
      this.unsubscribeUniqueUsername = onSnapshot(docRef, (doc) => {
        self.usernameAvailable = !doc.exists()
      })
    }
  },
  created() {
    if (this.isConnected) {
      this.$router.push({name: 'Home'});
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      email: { required, email },
      username: { 
        minLength: (value: string) => {
          return value.length > 2
        }
       },
      password: {
        minLength: (value: string) => {
          return value.length > 9
        },
        hasLetter: (value: string) => {
          return /[a-zA-Z]/.test(value)
        },
        numberOrSpecial: (value: string) => {
          return /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value)
        }
      }
    }
  },
  watch: {
    username(value) {
      this.updateValidator(value)
    },
    async isConnected() {
      if (this.user) {
        const { $t, user } = this;
        const { createdAt, displayName, uid } = user
        const creationTime = new Date(Number(createdAt)).getTime();
        const now = new Date().getTime();
        // look if account was created less than 10 seconds ago
        // to claim the username if it is the first time the user logs in
        if ((now - creationTime) < 10000 && displayName) {
          try {
            const uniqueUsernameRef = doc(db, "unique_usernames", displayName || this.username)
            await setDoc(uniqueUsernameRef, { owner: uid, createdAt: serverTimestamp() })
            useAppStore().toasts.push({
              actionCallback: null,
              actionText: "",
              title: $t("Welcome!"),
              open: true,
              message: $t("You account was successfully created!"),
              type: "success"
            })
          } catch (error) {
            useAppStore().toasts.push({
              actionCallback: null,
              actionText: "",
              title: $t("Welcome!"),
              open: true,
              message: $t("Don't forget to go the settings to create a username!"),
              type: "info"
            })
            try {
              await updateProfile(user, { displayName: null })
            } catch (error) {
              console.error('Error claiming username:', error)
            }
          }
        }
        // as long as the user is connected, redirect to the previous route or home page
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