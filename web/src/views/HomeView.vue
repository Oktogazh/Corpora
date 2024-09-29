<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-col items-center gap-4">
        <div
          id="post-creation-container"
          class="w-full flex flex-col"
          :class="posting ? 'opacity-75' : ''"
          v-if="isConnected">
          <textarea
            :disabled="posting"
            @input="v$.newSegment.$model = v$.newSegment.$model.substring(0, 200)"
            :placeholder="$t('Write a new post')"
            class="unset text-lg"
            style="min-height: 4.5rem; line-height: 1.5rem; font-size: 1rem"
            :style="`${v$.newSegment.$model}`.length == 0 ? 'font-size: 1.5rem;': null"
            v-model="v$.newSegment.$model"
          >
          </textarea>
          <div class="flex justify-end items-center gap-4">
            <span class="text-text select-none opacity-85 relative">
              <div class="absolute w-full h-full"></div>
              {{ v$.newSegment.$model.length }}/200
            </span>
            <SelectRoot :disabled="posting" v-model="v$.newSegmentLanguageTag.$model">
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
                    <AkChevronDownSmall />
                  </SelectScrollDownButton>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
            <button
              @click="publishSegment"
              :disabled="v$.$invalid || posting"
              class="bg-primary m-2 px-3 p-2 font-semibold rounded-full text-gray-100 disabled:opacity-75 disabled:hover:bg-primary hover:bg-primary-400"
            >
              <div class="flex items-center justify-center width-full height-full">
                <span :class="posting? 'opacity-0' : ''">
                  {{ $t("Publish") }}
                </span>
                <div
                  :class="posting ? '' : 'opacity-0'"
                  class="loader absolute m-auto border-primary border-2 border-t-white w-6 h-6 rounded-full">
                </div>
              </div>
            </button>
          </div>
          <Separator class="bg-secondary-200 h-px w-full"/>
        </div>
        <template
          v-if="posts.length === 0"
        >
          <Skeleton
            class="w-full h-24 bg-secondary"
            v-for="card of cardsSkeletons"
            :key="card"
          ></Skeleton>
        </template>
        <template
          v-else
        >
          <div
            v-for="post of posts"
            :key="post.id"
            class="w-full flex flex-col"
          >
            <div class="w-full flex">
              <div
                id="avatar"
                class="p-2"
              ></div>
              <div
                id="post-container"
                class="flex flex-col w-full"
              >
                <div
                  id="unique-user-name"
                  class="relative w-full"
                >
                  <span class="opacity-50">
                    @{{ post.ownerUsername || $t("User Deleted") }}
                  </span>
                  <div
                    class="absolute top-0 end-0"
                    v-if="user?.uid === post.ownerUid"
                  >
                    <DropdownMenu 
                    >
                      <DropdownMenuTrigger>
                        <BsThreeDotsVertical
                          class="opacity-75 hover:opacity-100" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          @click="deletePost(post)"
                          class="cursor-pointer"
                        >{{ $t("Delete post") }}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div
                  id="segment"
                  class="mb-2"
                >
                  <span>{{ post.segment }}</span>
                </div>
              </div>
            </div>
          <Separator class="bg-secondary-200 h-px w-full"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, type Ref, onBeforeUnmount } from 'vue'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AkChevronDownSmall,
  AkChevronUpSmall,
  AkCheck,
  BsThreeDotsVertical
} from '@kalimahapps/vue-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
/*   DropdownMenuLabel,
  DropdownMenuSeparator, */
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { db, functions } from '@/firebase'
import { collection,
  query,
  onSnapshot,
  getDocs,
  orderBy,
  where,
  doc,
  type Unsubscribe,
  type DocumentSnapshot,
  type FieldValue
} from 'firebase/firestore'
import { useAppStore } from '@/stores/app'
import { httpsCallable } from 'firebase/functions'
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'
import type { SegmentRefDoc, SegmentDoc, Post } from '@/types/firestoreDocTypes'

const userStore = useUserStore()
const languages: Ref<readonly string[]> = ref(navigator.languages)

const user = computed(() => userStore.user)
const isConnected = computed(() => userStore.isConnected)

// post creation section
const posting = ref(false)
const rules = {
  newSegment: {
    maxLength: maxLength(200),
    required
  },
  newSegmentLanguageTag: {
    required
  }
}
const newPostState = reactive({
  newSegment: '',
  newSegmentLanguageTag: ''
})
const v$ = useVuelidate(rules, newPostState)

const publishSegment = async () => {
  posting.value = true
  const postSegmentInPersonalCorpusCallable =
    httpsCallable(functions, 'postSegmentInPersonalCorpus')
  try {
    const res = await postSegmentInPersonalCorpusCallable({
      segment: newPostState.newSegment,
      languageTag: newPostState.newSegmentLanguageTag,
    })
    newPostState.newSegment = ''
    newPostState.newSegmentLanguageTag = ''
    const now = Date.now()
    posts.value = [({
      ...res.data as SegmentDoc & { id: string },
      ownerUsername: user.value!.displayName,
      createdAt: ({
        seconds: Math.floor(now / 1000),
        nanoseconds: (now % 1000) * 1000000
      } as unknown as FieldValue)
    } as Post), ...posts.value]
    posting.value = false

  } catch (error: any) {
    if (error && error.code) {
      let message = "" as string | [string, { tag: string, link: string }]
      switch (error.code) {
        case "functions/invalid-argument":
          message = [
            "Could not interpret tag Please supply a valid IETF/BCP-47 language tag!",
            {
              tag: newPostState.newSegmentLanguageTag,
              link: "<a href='https://tools.ietf.org/html/rfc5646' target='_blank'>https://tools.ietf.org/html/rfc5646</a>"
             }
          ]
          break;

        default:
          message = "An error occurred while publishing your post"
          break;
      }
      useAppStore()
        .toasts
        .push({
          actionCallback: null,
          actionText: "",
          title: "Error",
          open: true,
          message,
          type: "error"
        })
    }
  }
}

// Fetch posts & unique username
const unsubscribePosts: Ref<Promise<Unsubscribe[]> | []> = ref([])
const posts: Ref<Post[]> = ref([])
const cardsSkeletons = ref(4)
const uniqueUsernameMap: { [uid: string]: string} = {}
const populatePostsWithUsernames = async (postsObj: { [id: string]: SegmentDoc | null }) => {
  Object.values(postsObj)
    .filter((val): val is SegmentDoc => val !== null)
    .forEach((segment) => {
      const { ownerUid } = segment
      uniqueUsernameMap[ownerUid] = uniqueUsernameMap[ownerUid] || "..."
    })
  await Promise.all(
    Object.keys(uniqueUsernameMap).map(async (uid) => {
      if (uniqueUsernameMap[uid] === "...") {
        let uniqueUsername = ""
        try {
          uniqueUsername = (await getDocs(
            query(collection(db, "unique_usernames"),
              where("owner", "==", uid))
          )).docs[0].id
        } catch (error) {
          console.error("Error fetching unique username", error)
        }
        uniqueUsernameMap[uid] = uniqueUsername
      }
      return null
    })
  )
  posts.value = (Object.entries(postsObj)
    .filter(([, val]) => val !== null) as [string, SegmentDoc][])
    .map(([id, val]) => ({ id, ...val, ownerUsername: uniqueUsernameMap[val.ownerUid] }))
  return null
}
// query posts ordered by creation date (most recent first)
// where langtag is one of in the user's languages (string[])
const postsQuery = query(collection(db, "segments_refs"),
  orderBy("createdAt", "desc"),
  where("langtag", "in", languages.value)
);
const fetchPosts: () => Promise<Unsubscribe[]> = async () => {
  const postsRefs = (await getDocs(postsQuery)).docs.map((doc) => doc.data() as SegmentRefDoc)
  const postsObj: { [id: string]: SegmentDoc | null} = {}

  const unsubscribePosts = await Promise.all(postsRefs
    .map(async (postRef) => {
      return onSnapshot(doc(db, postRef.ref),
        (postSnapshot: DocumentSnapshot) => {
          if (postSnapshot.exists()) {
            postsObj[postSnapshot.id] = postSnapshot.data() as SegmentDoc
          }
          else {
            postsObj[postSnapshot.id] = null
          }
          if (Object.keys(postsObj).length === postsRefs.length) {
            populatePostsWithUsernames(postsObj)
          }
        })
      }
    ))
  return unsubscribePosts
}
unsubscribePosts.value = fetchPosts()
useAppStore().callback = () => {
  const u = unsubscribePosts.value
  if (u instanceof Promise) {
    u.then((unsubs) => unsubs.forEach((un) => un()))
  }
  else (u as Unsubscribe[]).forEach((unsub) => unsub())
  fetchPosts()
}

const deletePost = httpsCallable(functions, 'deleteSegmentInPersonalCorpus')

onBeforeUnmount(() => {
  const u = unsubscribePosts.value
  if (u instanceof Promise) {
    u.then((unsubs) => unsubs.forEach((un) => un()))
  }
  else u.forEach((unsub: Unsubscribe) => unsub())
  useAppStore().callback = null
})
</script>

<style scoped>
.loader {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>