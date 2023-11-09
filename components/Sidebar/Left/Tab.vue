<template>
    <nuxt-link :to="path" class="flex items-center p-3 w-min
    hover:bg-gray-100 rounded-full text-black
    dark:hover:bg-dim-200 dark:text-white" 
    :class="[defaultTransition, textClasses]">
        <div class="w-6 h-6 text-dark">
            <slot name="icon"></slot>
        </div>
    </nuxt-link>
</template>
<script setup>
    const {defaultTransition} = userTailwindConfig()
    const props = defineProps({
        active:{
            type:Boolean,
            default:false
        },
        path: {
            type: String,
            required: true
        }
    })
    const textClasses = computed(()=> props.active?'font-semibold':'font-normal')
</script>
