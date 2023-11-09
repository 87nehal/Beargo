<template>
    <div class="flex flex-row justify-between p-5 hover:bg-gray-100 dark:hover:bg-dim-300 rounded-md" >
        <nuxt-link :to="toProfileUrl" class="hover:underline">
            <div class="flex flex-row">
                <img class="w-10 h-10 rounded-full" :src="user.profileImage" :alt="user.username">
                <div class="flex flex-col ml-2">
                        <h1 class="text-sm font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
                        <p class="text-xs text-gray-400">@{{ user.username }}</p>
                </div>
            </div>
        </nuxt-link>
        <div v-if="authUser.username != props.user.username" class="flex items-center">
            <button v-if="following" @click="unfollowFunc(user.id)" class="rounded-full px-4 py-2 font-bold text-xs text-white bg-black
                dark:text-black dark:bg-white">Unfollow</button>
            <button v-else @click="followFunc(user.id)" class="rounded-full px-4 py-2 font-bold text-xs text-white bg-black
                dark:text-black dark:bg-white">Follow</button>
        </div>
    </div>
</template>  

<script setup>
import { ref, onBeforeMount } from 'vue';


const props = defineProps({
    user:{
        type: Object,
        required: true
    }
})

const { useAuthUser } = useAuth();
const authUser = useAuthUser();
const { checkFollowingStatus, followUser, unfollowUser } = useAuthor();
const following = ref(false);
const toProfileUrl = computed(() => `/profile/${props.user.username}`)

onBeforeMount(async () => {
    following.value = await checkFollowingStatus(authUser.value.id, props.user.id);
});

const followFunc = async (profileId) => {
    await followUser(authUser.value.id, profileId);
    following.value = true;
    props.authUser.followersCount++;
}

const unfollowFunc = async (profileId) => {
    await unfollowUser(authUser.value.id, profileId);
    following.value = false;
    props.authUser.followersCount--;
}
</script>