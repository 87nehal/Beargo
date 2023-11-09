<template>
    <div>
        <MainSection title="Post" :loading="loading">
            <Head>
                <Title>Post</Title>
            </Head>
            <PostDetails :user="user" :post="post"/>
            <PostRepliesListFeed :posts="post"/>    
        </MainSection>
    </div>
</template>
  
<script setup>
    import { watchEffect } from 'vue';
    import { useRoute } from 'vue-router';

    const loading = ref(false)
    const post = ref(null)
    const {useAuthUser} = useAuth()
    const user = useAuthUser()
    const {getPostById} = usePosts()
  
    const route = useRoute();
    let getPostIdFromRoute=""
  
    watchEffect(() => {
        getPostIdFromRoute = route.params.id;
        getPost()
    });

    async function getPost(){
        loading.value = true
        try {
            const response = await getPostById(getPostIdFromRoute)
            post.value = response.post
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }
    onBeforeMount(()=>{
        getPost()
    })
</script>
  