<template>
    <div v-if="isEmptyFeed" class="p-4">
        <p class="text-center text-lg text-gray-500">
            No Replies 😞
        </p>
    </div>
    <div v-else class="pb-4 border-b hover:bg-gray-50
    dark:hover:bg-dim-300"
    :class="[borderColor,defaultTransition]"
    v-for="post in props.posts.post" :key="post.id">
        <PostItem :post="post" compact/>
    </div>
</template>
<script setup>
const {borderColor,defaultTransition} = userTailwindConfig()
const props = defineProps({
    posts:{
        type: Object,
        required: true
    },
})
const isEmptyFeed = computed(()=>props.posts.length===0)
</script>