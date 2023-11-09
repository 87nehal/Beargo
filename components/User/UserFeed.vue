<template>
    <div class="flex flex-wrap border-b" :class="[borderColor, defaultTransition]">
      <UserItem v-for="user in props.users" :key="user.id" class="w-full md:w-1/2 xl:w-1/3" :user="user" />
    </div>
</template>
<script setup>
const {borderColor,defaultTransition} = userTailwindConfig()
const props = defineProps({
    users:{
        type: Object,
        required: true
    },
})
</script>