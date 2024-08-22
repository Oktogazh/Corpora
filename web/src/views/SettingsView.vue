<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-col items-start gap-4">
        <h1 class="text-lg font-semibold">
          {{ $t("Account Settings") }}
        </h1>
        <div class="w-full flex flex-col gap-4">
          <label class="text-text" for="username">
            {{ $t("Username") }}*
            <input
              v-model="changes.username"
              name="username"
              class="w-full border-[1px] border-text rounded-md p-[4px] px-3"
              type="text">
          </label>
          <label class="text-text" for="username">
            {{ $t("Username") }}*
            <input
              v-model="changes.email"
              name="username"
              class="w-full border-[1px] border-text rounded-md p-[4px] px-3"
              type="text">
          </label>
          <span class="text-sm">
            {{ $t("* required fields") }}
          </span>
          <div
            v-if="user!.providerData[0].providerId"
          >
          {{ $t("Provider") }}:
          {{ user!.providerData[0].providerId }}
          </div>
        </div>
        <pre>{{ user }}
        </pre>

        <div
          v-if="stateChanged"
          class="sticky bottom-2 mx-4 bg-transparent h-16 w-full flex justify-center gap-4">
          <button
            @click="forgetChanges"
            class="w-72 bg-secondary text-background font-semibold p-2 rounded-full hover:bg-secondary-500 mt-4">
            {{ $t("Forget changes") }}
          </button>
          <button
            @click="saveChanges"
            class="w-72 bg-primary text-background font-semibold p-2 rounded-full hover:bg-primary-500 mt-4">
            {{ $t("Save changes") }}
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

export default defineComponent({
  name: 'SettingsView',
  components: {
  },
  computed: {
    stateChanged() {
      const { displayName: username, email: email, photoURL } = this.user!
      const changes = JSON.stringify(this.changes)
      const initialValues = JSON.stringify({
        username,
        email,
        photoURL
      })
      return changes !== initialValues
    },
    ...mapState(useUserStore,{
      user: (state) => state.user,
    })
  },
  data: () => ({
    changes: {
      username: useUserStore().user?.displayName,
      email: useUserStore().user?.email,
      photoURL: useUserStore().user?.photoURL
    },
    cardsSkeletons: 4,
  }),
  methods: {
    forgetChanges() {
      this.changes = {
        username: useUserStore().user?.displayName,
        email: useUserStore().user?.email,
        photoURL: useUserStore().user?.photoURL
      }
    },
    async saveChanges() {
      console.log(this.changes)
    }
  }
})
</script>

<style scoped>

</style>