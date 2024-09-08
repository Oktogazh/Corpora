<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-col items-center gap-4">
        <div
          class="w-full flex flex-col"
          v-if="isConnected">
          <textarea
            :placeholder="$t('Write a new post')"
            class="unset"
            style="min-height: 10ch"
            v-model="v$.newSegment.$model"
          ></textarea>
          <div class="flex justify-end items-center gap-4">
            <SelectRoot v-model="newSegmentLanguage">
              <SelectTrigger
                class="inline-flex min-w-[160px] items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] hover:opacity-90 bg-secondary-50 outline-none"
                aria-label="language-selector"
              >
                <SelectValue class="text-text" :placeholder="$t('Language of the post')" />
                <AkChevronDownSmall/>
              </SelectTrigger>

              <SelectPortal>
                <SelectContent
                  class="min-w-[160px] bg-secondary-50 text-text rounded will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                  data-side="left"
                >
                  <SelectScrollUpButton class="flex items-center justify-center h-[25px] cursor-default">
                    <AkChevronUpSmall/>
                  </SelectScrollUpButton>

                  <SelectViewport class="p-[5px]">
                    <SelectLabel class="px-[25px] text-xs leading-[25px]">
                      {{  $t("Browser's languages") }}
                    </SelectLabel>
                    <SelectGroup>
                      <SelectItem
                        v-for="(option, index) in languages"
                        :key="index"
                        class="text-[13px] leading-none rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[highlighted]:outline-none hover:cursor-pointer hover:bg-secondary-100"
                        :value="option"
                      >
                        <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                          <AkCheck/>
                        </SelectItemIndicator>
                        <SelectItemText>
                          {{ option }}
                        </SelectItemText>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>

                  <SelectScrollDownButton class="flex items-center justify-center h-[25px] cursor-default">
                    <Icon icon="radix-icons:chevron-down" />
                  </SelectScrollDownButton>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
            <span class="text-text select-none opacity-85 relative">
              <div class="absolute w-full h-full"></div>
              {{ v$.newSegment.$model.length }}/200
            </span>
            <button
              @click="publishSegment"
              :disabled="v$.$invalid"
              class="bg-primary m-2 px-3 p-2 font-semibold rounded-full text-gray-100 disabled:opacity-75 disabled:hover:bg-primary hover:bg-primary-400"
            >
              {{ $t("Publish") }}
            </button>
          </div>
          <Separator class="bg-secondary-200 h-px w-full"/>
        </div>
        <template
          v-if="posts.length === 0"
        >
          <Skeleton
            class="w-96 h-52 bg-secondary"
            v-for="card of cardsSkeletons"
            :key="card"
          ></Skeleton>
        </template>
        <template
          v-else
        >
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, type Ref, onBeforeUnmount } from 'vue'
import { Skeleton } from '@/components/shadcn/ui/skeleton'
import { AkChevronDownSmall, AkChevronUpSmall, AkCheck } from '@kalimahapps/vue-icons';
import {
  Separator,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
 } from 'radix-vue'
import { db } from '@/firebase'
import ietfLnaguagesRepo from '@/assets/utils/ietfLanguagesRepo.json'
import { collection, query, onSnapshot } from 'firebase/firestore'
import type { Languoid } from '@/types/firestoreDocTypes'
import type { IETFLanguage } from '@/types/utils'
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const userStore = useUserStore()
const languages = ref(navigator.languages)
const languagesRepo: Ref<IETFLanguage[]> = ref(ietfLnaguagesRepo)

const user = computed(() => userStore.user)
const isConnected = computed(() => userStore.isConnected)

// Fetch posts
const posts: Ref<Languoid[]> = ref([])
const cardsSkeletons = ref(4)
const postsQuery = query(collection(db, "languoids"));
const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
  const languagesSnapshots: Languoid[] = [];
  querySnapshot.forEach((doc) => {
      languagesSnapshots.push(doc.data() as Languoid);
  });
  posts.value = languagesSnapshots;
  console.log("Posts ", languagesSnapshots.join(", "));
});

// post creation section
const newSegment = ref('')
const newSegmentLanguage = ref('')
const rules = {
  newSegment: { required }
}
const newPostState = reactive({
  newSegment: ''
})
const v$ = useVuelidate(rules, newPostState)

const publishSegment = () => {
  console.log('publishSegment', newSegment.value)
}

onBeforeUnmount(() => {
  unsubscribe()
})
</script>

<style scoped>

</style>