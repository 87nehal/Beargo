<template>
    <div>
      <label v-if="props.label" class="block pl-3 ml-px text-sm font-semibold" :class="props.dark ? 'text-white' : 'text-gray-700'">
        {{ props.label }}
      </label>
      <input
        :value="props.modelValue"
        @input="event => emits('update:modelValue', event.target.value)"
        :disabled="props.disabled"
        :class="props.dark?'text-white bg-gray-800':'text-gray-800', 
            props.disabled?'cursor-not-allowed text-opacity-60':''"
        class="block w-full px-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-prime-0 focus:border-prime-0 sm:text-sm"
        :placeholder="props.placeholder"
        :type="props.type"
      >
    </div>
  </template>
  
  <script setup>
  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: null
    },
    placeholder: {
      type: String,
      required: null
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  })
  </script>
  