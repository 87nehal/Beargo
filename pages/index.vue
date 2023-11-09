<template>
    <div :key="key">
        <MainSection title="Home" :loading="loading">
            <Head>
                <Title>Home</Title>
            </Head>
            <div class="border-b" :class="borderColor">
                <PostForm :user="user" @on-success="handleFormSuccess"/>
            </div>
            <PostListFeed :posts="homePosts"/>
            <p class="text-center m-20 text-lg font-semibold dark:text-white" v-if="!hasMorePosts">You have reached the end 😮.</p>
        </MainSection>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onUnmounted } from 'vue'

const {getHomePosts} = usePosts()
const loading = ref(false)
const homePosts = ref([])
const { useAuthUser } = useAuth()
const user = useAuthUser()
const {borderColor} = userTailwindConfig()
const page = ref(1)
const hasMorePosts = ref(true)

onBeforeMount(async()=>{
    loading.value = true
    try {
       const posts = await getHomePosts(user.value.id, page.value) 
       homePosts.value = posts
       if (posts.length < 10) {
         hasMorePosts.value = false
       }
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
})

const loadMorePosts = async () => {
  page.value++
  const newPosts = await getHomePosts(user.value.id, page.value)
  if (newPosts.post.length === 0) {
    hasMorePosts.value = false
  } else {
    homePosts.value.post.push(...newPosts.post)
  }
}

function handleFormSuccess(post){
    navigateTo({
        path: `/status/${post.id}`
    })
}

const checkScroll = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  if (nearBottom && hasMorePosts.value) {
    loadMorePosts();
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const key = ref(Date.now())
</script>