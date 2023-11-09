<template>
    <div class="overflow-hidden rounded-2xl m-2 border bg-gray-50 dark:bg-dim-700" 
        :class="borderColor">
        <h1 class="p-3 text-xl font-extrabold text-gray-900 border-b
        dark:text-white"
        :class="borderColor">
            {{props.title}}
        </h1>
        <slot>

        </slot>
        <button class="p-3 text-sm text-prime-0 cursor-pointer hover:bg-gray-100 
        dark:hover:bg-dim-300 w-full text-left" :class="borderColor" @click="$emit('edit-clicked')">
            {{props.buttonText}}
        </button>
    </div>
</template>
<script setup>
    const props = defineProps({
        title:{
            type:String,
            required:true
        },
        buttonText: {
            type: String,
            required: true,
            default: "Show more"
        }
    })
    const {borderColor } = userTailwindConfig()
</script>