<template>
    <div :key="key">
    <MainSection :title="getHandleFromRoute" :loading="loading">
        <Head>
            <Title>Profile > {{ getHandleFromRoute }}</Title>
        </Head>
        <div
            class="m-2 bg-white shadow-sm rounded-lg text-gray-900 dark:bg-gray-800 border-2 dark:text-white" :class="borderColor">
            <div class="rounded-t-lg h-32 overflow-hidden">
                <img class="object-cover object-top w-full" :src="profile.user.backgroundImage" alt='backgroundImage'>
            </div>
            <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden dark:border-gray-700">
                <img class="object-cover object-center h-32" :src="profile.user.profileImage" alt='profileImage'>
            </div>
            <div class="text-center mt-2">
                <h2 class="font-semibold">{{ profile.user.name }}</h2>
                <p class="text-gray-500 dark:text-gray-300">{{ profile.user.bio }}</p>
            </div>
            <ul class="mt-2 text-gray-700 flex items-center justify-around">
                <li v-for="badge in profile.user.badges" :key="badge.id" class="flex flex-col items-center justify-around">
                    <div class="relative">
                        <div class="text-2xl cursor-pointer" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
                            <img class="w-5 h-5 rounded-full" :src="badge.imageUrl" alt="Badge Image">
                        </div>
                        <div v-if="showTooltip" class="absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-900 text-white text-sm rounded-lg text-center">
                            {{ badge.name }}
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="text-gray-700 flex items-center justify-around dark:text-gray-200">
                <li class="flex flex-col items-center justify-around">
                    <div class="text-2xl">{{ profile.user.followersCount }}</div>
                    Followers
                </li>
                <li class="flex flex-col items-center justify-between">
                    <div class="text-2xl">{{ profile.user.followingCount }}</div>
                    Following
                </li>
            </ul>
            <div class="p-4 border-t mx-14 mt-2 xl:mx-96">
                <UIButton v-if="following && user.id !== profile.user.id" @click="unfollowFunc(user.id,profile.user.id)" liquid size="sm">Unfollow</UIButton>
                <UIButton v-else-if="!following && user.id !== profile.user.id" @click="followFunc(user.id,profile.user.id)" liquid size="sm">Follow</UIButton>
            </div>
        </div>
        <PostListFeed :posts="posts"/>
    </MainSection>
</div>
</template>

<script setup>
import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';


const loading = ref(false)
const profile = ref(null)
const posts = ref([])
const following = ref(false)
const {getProfileByHandle,checkFollowingStatus,followUser,unfollowUser} = useAuthor()
const {getPostsByUser} = usePosts()
const { useAuthUser } = useAuth()
const user = useAuthUser()
const {borderColor} = userTailwindConfig()
const showTooltip = ref(false);

const route = useRoute();
let getHandleFromRoute=""
let userId=""
watchEffect(() => {
    getHandleFromRoute = route.params.id;
    userId = user.value.id; 
    getUser()
});
async function getUser(){
    loading.value = true
    try {
        const responseProfile = await getProfileByHandle(getHandleFromRoute)
        const responsePosts = await getPostsByUser(getHandleFromRoute)
        profile.value = responseProfile
        posts.value =  responsePosts
        console.log("profile:"+profile.value.user.id+" user:"+userId)
        following.value = await checkFollowingStatus(userId,profile.value.user.id)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
onBeforeMount(()=>{
    getUser()
})
const key = ref(Date.now())

async function unfollowFunc(userId,profileId){
    await unfollowUser(userId,profileId)
    following.value = false
    console.log("Unfollow")
    profile.value.user.followersCount--
}
async function followFunc(userId,profileId){
    await followUser(userId,profileId)
    following.value = true
    console.log("follow")
    profile.value.user.followersCount++
}

</script>
