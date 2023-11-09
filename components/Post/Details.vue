 <template>
    <div>
        <PostItem :post="props.post" focus/>
        <PostForm placeholder="Reply" 
        :reply-to="props.post" 
        :user="props.user"
        @on-success="handleFormSuccess"/>
        <PostRepliesListFeed :posts="replies"/>
    </div>
 </template>
 <script setup>
 const props = defineProps({
    post:{
        type: Object,
        required: true
    },
    user:{
        type: Object,
        required: true
    }
 })
 const replies = computed (()=>props.post?.replies || [])
 function handleFormSuccess(post){
    navigateTo({ 
        path: `/status/${post.id}`
    })
 }
 </script>