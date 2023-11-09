<template>
    <PostItemHeader :post="props.post" />
    <div :class="postBodyWrapper" @click="redirect(post)">
        <p class="flex-shrink font-medium text-gray-800
            dark:text-white" :class="textSize">
            {{ cleanedPostText }}
        </p>
        <div v-for="image in post.mediaFiles" :key="image.id" 
        class="flex my-3 mr-2 rounded-2xl justify-center">
            <div v-if="focus">
                <img :src="image.url" class="w-full rounded-xl border-b"/>
            </div>
            <div v-else class="overflow-hidden flex-auto justify-center max-h-[500px] relative">
                <div class="absolute inset-0 pointer-events-none">
                    <div class="h-5/6"/>
                    <div class="h-1/6 bg-gradient-to-t from-white from-1% opacity-10
                    dark:from-slate-900"></div>
                </div>
                <img :src="image.url" class="rounded-xl object-cover h-full w-full bg-no-repeat bg-center"/>
            </div>
        </div>
        <SidebarRightPreviewCardsItems v-if="stockInfo" class="my-3 mr-2 rounded-md justify-center p-5">
            <div class="flex justify-between dark:text-white">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-white" @click="handleStockClick(stockInfo.symbol)">
                        {{ stockInfo.symbol}}
                    </h2>
                    <p >
                        ${{ stockInfo.curr }}
                    </p>
                </div>
                <p :class="['text-xl','font-semibold', stockInfo.pred > stockInfo.curr ? 'text-green-500' : 'text-red-500']">
                    ${{ stockInfo.pred }}
                </p>
            </div>

        </SidebarRightPreviewCardsItems>
    </div>
    <div class="mt-2" v-if="!props.hideActions">
        <PostItemActions :post="props.post"/>
    </div>
</template>
<script setup>
const {borderColor} = userTailwindConfig()
const props = defineProps({
    post:{
        type:Object,
        required: true
    },
    compact:{
        type:Boolean,
        default: false
    },
    focus:{
        type:Boolean,
        default: false
    },
    hideActions:{
        type:Boolean,
        default: false
    }
})
function redirect (post) {
    navigateTo({ 
        path: `/status/${post.id}`
    })
}

const postBodyWrapper = computed(()=>props.compact?'ml-16' : 'ml-2 mt-4')
const textSize = computed(()=>props.compact?'text-base' : 'text-2xl')

const cleanedPostText = computed(() => {
  return props.post.text.replace(/<stock>[\s\S]*?<\/stock>/g, '');
});

const stockInfo = computed(() => {
  const stockMatch = props.post.text.match(/<stock>[\s\S]*?<\/stock>/g);
  if (stockMatch) {
    const stockText = stockMatch[0];
    const nameMatch = stockText.match(/<name>(.*?)<\/name>/);
    const currMatch = stockText.match(/<curr>(.*?)<\/curr>/);
    const predMatch = stockText.match(/<pred>(.*?)<\/pred>/);
    return {
      symbol: nameMatch ? nameMatch[1] : '',
      curr: currMatch ? currMatch[1] : '',
      pred: predMatch ? predMatch[1] : '',
    };
  }
  return null;
});

const handleStockClick = (symbol) => {
    useRouter().push({
    path: '/search',
    query: {
        q: symbol
    }
    })
}

</script>