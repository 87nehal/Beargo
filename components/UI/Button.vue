<template>
    <button class="flex justify-center text-white bg-prime-0 rounded-full font-sm p-2 
    disabled:bg-gray-300 disabled:cursor-not-allowed dark:text-dim-900 font-semibold" :disabled="$props.disabled"
    :class="classes" @click="handelClick">
        <span :class="textFontClasses">
            <slot/>
        </span>
    </button>
</template>
<script setup>
const emits = defineEmits(['onClick'])
const props = defineProps({
    disabled:{
        type: Boolean,
        default: false
    },
    size:{
        type:String,
        default:"md"
    },
    liquid:{
        type:Boolean,
        default:false
    }
})
const paddingClasses = computed(()=>{
    switch (props.size){
        case 'sm':
            return 'px-2 py-2'
        case 'lg':
            return 'px-4 py-2'
        default:
            return 'px-3 py-3'
    }
})
const textFontClasses = computed(()=>{
    switch (props.size){
        case 'lg':
            return 'text-md'
        default:
            return 'text-sm'
    }
})
const defaultWidth = computed(()=>{
    switch (props.size){
        case 'lg':
            return 'text-md'
        default:
            return 'w-min'
    }
})

function handelClick(event){
    emits('onClick',event)
}

const classes = computed(()=>`${paddingClasses.value} ${props.liquid ? 'w-full':defaultWidth.value}`)
</script>