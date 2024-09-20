<template>
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
      {{ $t("{n} characters", {n: 10}) }}
    </span>
  </div>
  <button
    :disabled="v$.password.$invalid"
    class="w-72 bg-primary text-background font-medium p-2 rounded-full hover:bg-primary-500 mt-4 disabled:bg-primary-300"
    @click="actionCallback">
    {{ $t('Next') }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useVuelidate } from '@vuelidate/core'

export default defineComponent({
  name: 'UniqueUsernameInput',
  components: {
  },
  data: () => ({
    showPassword: false,
    value: ''
  }),
  setup () {
    return { v$: useVuelidate() }
  },
  props: {
    actionCallback: {
      type: null,
      required: true
    },
    actionButtonTextTranslationKey: {
      default: 'Next',
      type: String,
      required: true
    }
  },
})
</script>

<style scoped>

</style>
