<template>
    <div class="p-3 border-b cursor-pointer 
        hover:bg-gray-100
        dark:hover:bg-dim-300"
        :class="wrapperClasses">
        <slot/>
    </div>
</template>
<script setup>
const wrapperClasses = computed(()=>`${defaultTransition} ${borderColor}`)
const {defaultTransition,borderColor} = userTailwindConfig()
</script>