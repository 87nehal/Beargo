<template>
    <div class="h-screen bg-slate-50">
        <div class="absolute font-mono font-extrabold text-3xl m-5">
            Beargo
        </div>
        <div class="flex flex-col justify-center items-center h-screen ">
            <AuthLoginForm v-if="formType === 'auth'" class="z-10"/>
            <AuthRegistrationForm v-else class="z-10"/>
            <button class="m-2 text hover:underline z-10" @click="toggleForm">
                {{ formType === 'auth' ? 'New here? Register' : 'Already a memebr? Login' }}
            </button>
        </div>
        <img class="absolute bottom-0 right-0" src="/img/home_down.png" alt="">
        <img class="absolute top-20 left-20" src="/img/home_up.png" alt="">
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formType = ref('auth');

const toggleForm = () => {
    formType.value = formType.value === 'auth' ? 'register' : 'auth';
};
</script>
