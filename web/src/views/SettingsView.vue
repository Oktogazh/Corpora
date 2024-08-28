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

          <DialogRoot #>
            <DialogTrigger
              class="w-72 bg-red-500 bg-opacity-25 text-red-500 font-medium p-2 rounded-full hover:bg-opacity-40 mt-4">
              {{ $t("Delete Account") }}
            </DialogTrigger>
            <DialogPortal>
              <DialogOverlay class="bg-black bg-opacity-50 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
              <DialogContent
                class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100] bg-background text-text"
              >
                <DialogTitle class="m-0 text-[17px] font-semibold">
                  {{ $t("Delete Account") }}
                </DialogTitle>
                <DialogDescription class="mt-[10px] mb-5 text-[15px] leading-normal">
                  {{ $t("Are you sure you want to delete your account? This action is irreversible.") }}
                </DialogDescription>
                <div class="mt-[25px] flex justify-end">
                  <DialogClose as-child>
                    <button
                      ref="deleteDialogCloseButton"
                      class="bg-green-500 bg-opacity-20 px-4 me-4 text-accent font-medium p-2 rounded-full hover:bg-opacity-40 mt-4">
                      {{ $t("Cancel") }}
                    </button>
                  </DialogClose>
                  <button
                    @click="deleteAccount"
                    class="px-4 bg-red-500 bg-opacity-25 text-red-500 font-medium p-2 rounded-full hover:bg-opacity-40 mt-4">
                    {{ $t("I understand, delete my account") }}
                  </button>
                </div>
              </DialogContent>
            </DialogPortal>
          </DialogRoot>
        </div>

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
            {{ $t("Save Account") }}
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
import { deleteUser, type User, type AuthError } from "firebase/auth";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import { auth } from '@/firebase';
import { useAppStore } from '@/stores/app';

export default defineComponent({
  name: 'SettingsView',
  components: {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
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
    confirmDelete: false,
    cardsSkeletons: 4,
  }),
  methods: {
    async deleteAccount() {
      try {
        await deleteUser(auth.currentUser as User)
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
      (this.$refs.deleteDialogCloseButton as HTMLButtonElement).click()
    },
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