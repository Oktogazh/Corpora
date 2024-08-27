<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="relative section-container flex flex-col items-start gap-4">
        <div
          class="w-full h-24 bg-accent-200 absolute dark text-text">
          <div class="w-full flex justify-between px-4">
            <div class="pt-2">
              <h1 class="text-xl font-bold text-text-800">
                {{ user!.displayName || $t('Username') }}
              </h1>
              <span>{{ user?.email }}</span>
            </div>
            <AvatarRoot class="z-10 -translate-y-2">
              <AvatarImage
                :alt="user!.displayName || $t('Username')"
                class="w-28 h-28 border-4 border-white bg-white rounded-full shadow-md"
                :src="user!.photoURL || ''" />
              <AvatarFallback class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
                {{ user!.displayName![0] }}
              </AvatarFallback>
            </AvatarRoot>
          </div>
        </div>
        <div class="mt-28 ">

        </div>
        <pre>{{ user }}
        </pre>

        <div
          v-if="stateChanged"
          class="sticky bottom-2 mx-4 bg-transparent h-16 w-full flex justify-end">
          <button class="w-72 bg-primary text-background font-semibold p-2 rounded-full hover:bg-primary-500 mt-4">
            {{ $t("Save change") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { defineComponent } from 'vue'
import { AvatarImage, AvatarRoot, AvatarFallback } from 'radix-vue'

export default defineComponent({
  name: 'SettingsView',
  components: {
    AvatarRoot,
    AvatarImage,
    AvatarFallback
  },
  computed: {
    stateChanged() {
      const { displayName, email, password, photoURL } = this.changes
      return Boolean(
        displayName ||
        email ||
        password ||
        photoURL)
    },
    ...mapState(useUserStore,{
      user: (state) => state.user,
    })
  },
  data: () => ({
    changes: {
      displayName: '',
      email: '',
      password: '',
      photoURL: ''
    },
    cardsSkeletons: 4,
  }),
  methods: {
    async saveChanges() {
      const { displayName, email, password, photoURL } = this.changes
    }
  }
})
</script>

<style scoped>

</style>