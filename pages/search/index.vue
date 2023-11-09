<template>
    <div>
        <MainSection title="Search" :loading="loading">
            <Head>
                <Title>Search</Title>
            </Head>
            <div class="m-2  flex justify-strech p-2" :class="borderColor">
                <UIInput v-model="search" class="w-full" placeholder="Search"/>
                <UIButton class="ml-2" @onClick="handleSearch"  :disabled="isDisabled">
                    <div class="w-4 h-4">
                        <MagnifyingGlassIcon/>
                    </div>
                </UIButton>
            </div>
            <UserFeed :users="searchUsers"/>
            <PostListFeed v-if="searchPosts.post.length" :posts="searchPosts"/>
            <div v-if="searchPosts.post.length == 0 && searchUsers.length == 0 && searchQuery" class="text-center dark:text-white" >No results 😔 for <b>{{ searchQuery }}</b></div>
        </MainSection>
    </div>
</template>
<script setup>
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
const{borderColor} = userTailwindConfig()
const search = ref('')
const isDisabled = computed(()=>search.value==='')
const {getSearchPosts} = usePosts()
const {getSearchUsers} = useAuthor()

const loading = ref(false)
const searchPosts = ref([])
const searchUsers = ref([])
const route = useRoute()
const searchQuery = ref('')

watchEffect(() => {
    loadSearch()
})

onBeforeMount(()=>{
    loadSearch()
})

async function loadSearch(){
    loading.value=true
    searchQuery.value = route.query.q
    console.log(searchQuery.value)
    try{
        const posts = await getSearchPosts({
            query: searchQuery.value,
            user:window.localStorage.getItem('user')
        })
        const users = await getSearchUsers({
            query: searchQuery.value
        })
        searchPosts.value = posts
        searchUsers.value = users.users
    }catch(error){
        console.log(error)
    }finally{
        loading.value = false
    }
}

function handleSearch(){
    useRouter().push({
        path:'/search',
        query:{
            q: search.value
        }
    })
}
</script>
