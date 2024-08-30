<template>
  <div class="w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex items-center justify-center">
        <div class="flex flex-col justify-center items-center gap-8 text-center">
          <h1 class="text-4xl mx-2 font-bold text-text-900">
            {{ $t("Password Forgotten") }}
          </h1>

          <div class="flex flex-col justify-center gap-4 w-fit">
            <div>
              <label
                class="flex flex-col text-start font-semibold text-sm mb-2"
                for="email">
                {{ $t('Email') }}
              </label>
              <input
                id="email"
                class="w-full border-[1px] border-secondary-300 p-2 rounded bg-background-100 hover:bg-background-50 hover:border-secondary-200"
                type="email"
                :placeholder="$t('Email')"
                v-model="v$.email.$model">
            </div>
            <button
              :disabled="v$.$invalid"
              class="w-72 bg-primary disabled:bg-primary-300 text-background font-semibold p-2 rounded-full hover:bg-primary-500 mt-4"
              @click="sendResetEmail">
              {{ $t("Send an email") }}
            </button>
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
import { auth } from '@/firebase';
import { sendPasswordResetEmail, type AuthError } from "firebase/auth";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useAppStore } from '@/stores/app'


export default defineComponent({
  name: 'ForgotPwdRequestView',
  components: {
    Separator,
  },
  data: () => ({
    email: ''
  }),
  methods: {
    async sendResetEmail() {
      const { $t } = this;
      try {
        await sendPasswordResetEmail(auth, this.email);
        useAppStore().toasts.push({
          actionCallback: null,
          actionText: "",
          title: $t("Email sent!"),
          open: true,
          message: $t("If the email is linked to an account, you will receive a link to reset your password."),
          type: "info"
        })
        this.email = '';
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
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      email: { required, email }
    }
  }
})
</script>

<style scoped>

</style>