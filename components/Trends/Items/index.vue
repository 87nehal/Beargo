<template>
    <div class="w-full md:w-1/2 xl:w-1/3 p-2 hover:cursor-pointer" @click="handleTrendClick(keyword.word)">
      <div class="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 hover:bg-slate-100 dark:hover:bg-gray-800/80" >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ keyword.word }}</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-2">Posts: {{ keyword.frequency }}</p>
      </div>
    </div>
  </template>
  
<script setup>
    const props = defineProps({
        keyword: {
            type: Object,
            required: true,
        },
    })
  function handleTrendClick(keyword){
    useRouter().push({
        path:'/search',
            query:{
                q: keyword
            }
        })
    }
</script>
  
  