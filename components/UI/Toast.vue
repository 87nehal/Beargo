<template>
  <transition name="slide-fade">
    <div v-if="message" :class="`z-20 toast toast-${type} flex items-center justify-between w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800`" role="alert">
      <div class="flex items-center space-x-4 text-center">
        <div v-if="type === 'success'" class="w-5 h-5 text-green-600 dark:text-green-500">
          <CheckCircleIcon/>
        </div>
        <div v-if="type === 'error'" class="w-5 h-5 text-red-600 dark:text-red-500">
          <ExclamationCircleIcon/>
        </div>
        <div v-if="type === 'alert'" class="w-5 h-5 text-yellow-600 dark:text-yellow-500">
          <BellAlertIcon/>
        </div>
        <div class="pl-4 text-sm font-normal">{{ message }}</div>
      </div>
      <div @click="dismiss" class="text-gray-500 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

import { ExclamationCircleIcon,CheckCircleIcon,BellAlertIcon } from "@heroicons/vue/24/outline"

const emitter = useEmitter();
let message = ref(null);
let type = ref(null);

emitter.$on('toast', (payload) => {
  message.value = payload.message;
  type.value = payload.type;
  setTimeout(() => {
    message.value = null;
  }, 3000);
});

const dismiss = () => {
  message.value = null;
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>