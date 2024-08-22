<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-col items-start gap-4">
        <h1 class="text-lg font-semibold">
          {{ $t("Account") }}
        </h1>
        <div> 
          <AvatarRoot>
            <AvatarImage
              class="w-16 h-16 rounded-full"
              :src="user!.photoURL || ''" />
            <AvatarFallback />
          </AvatarRoot>
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
import { AvatarImage, AvatarRoot } from 'radix-vue'

export default defineComponent({
  name: 'SettingsView',
  components: {
    AvatarRoot,
    AvatarImage
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
      console.log(this.changes)
    }
  }
})
</script>

<style scoped>

</style>