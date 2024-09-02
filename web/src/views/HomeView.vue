<template>
  <div class="flex flex-col w-full ">
    <div class="w-full px-6 sm:px-12 lg:px-16">
      <div class="section-container flex flex-col items-center gap-4">
        <div
          class="w-full flex flex-col"
          v-if="isConnected">
          <textarea
            class="unset"
            v-model="v$.newSegment.$model"
          ></textarea>
          <div class="flex justify-end items-center gap-4">
            <span class="text-text select-none opacity-85">
              <div class="absolute w-full h-full"></div>
              {{ newSegment.length }}/200
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
import { Separator } from 'radix-vue'
import { db } from '@/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import type { Languoid } from '@/types/firestoreDocTypes'
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const userStore = useUserStore()

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