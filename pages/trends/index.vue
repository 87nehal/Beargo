<template>
    <div>
        <MainSection title="Trends" :loading="loading">
            <Head>
                <Title>Trends</Title>
            </Head>
            <TrendsFeed :keywords="trendsKeys.trendingKeywords"/>
        </MainSection>
    </div>
</template>
<script setup>
const{borderColor} = userTailwindConfig()
const isDisabled = computed(()=>search.value==='')
const {getTrendingPosts} = usePosts()

const loading = ref(false)
const trendsKeys = ref([])
const route = useRoute()

watchEffect(() => {
    loadTrends()
})

onBeforeMount(()=>{
    loadTrends()
})

async function loadTrends(){
    loading.value=true
    try{
        const keys = await getTrendingPosts()
        trendsKeys.value = keys
    }catch(error){
        console.log(error)
    }finally{
        loading.value = false
    }
}

function handleSort(){
    useRouter().push({
        path:'/search',
        query:{
            q: search.value
        }
    })
}
</script>
