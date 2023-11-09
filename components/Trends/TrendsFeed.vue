<template>
    <div class="flex flex-wrap border-b" :class="[borderColor, defaultTransition]">
      <TrendsItems v-for="word in props.keywords" :key="word.word" class="w-full sm:w-1/2 md:w-1/2 xl:w-1/3" :keyword="word" />
    </div>
  </template>
  
  <script setup>
  const { borderColor, defaultTransition } = userTailwindConfig();
  const props = defineProps({
    keywords: {
      type: Array,
      required: true,
    },
  });
  </script>
  