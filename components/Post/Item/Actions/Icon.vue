<template>
    <div class="flex items-center text-gray-400 cursor-pointer group">
        
        <div :class="[`p-2 group-hover:text-${props.color}-400 rounded-full`, 'dark:group-hover:opacity-20', defaultTransition]">
            <slot name="icon" classes="w-5 h-5"/>
        </div>
        <span :class="['ml-1', 'flex-shrink-0', `group-hover:text-${props.color}-400`]">
            <slot name="default"/>
        </span>
    </div>
</template>
<script setup>
const {defaultTransition} = userTailwindConfig()
const props = defineProps({
    color:{
        type:String,
        required:true
    }
})
</script>
