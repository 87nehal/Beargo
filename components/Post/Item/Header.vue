<template>
<!--Head-->
    <div>
      <div v-if=deleted class="flex p-4 bg-red-50 opacity-50">
        <div>
          <img :src="author.profileImage" alt="" class="w-6 h-6 rounded-full" @click="redirectToProfile(post)" />
        </div>
        <div class="ml-3">
          <span class="font-medium text-gray-800 dark:text-white hover:underline">
            {{ author.name }}
          </span>
          <span class="ml-3 font-medium text-gray-400 dark:text-white">
            <span class="hover:underline">
              @{{ author.username }}
            </span>
            . {{ props.post.postedAtHuman }}
          </span>
          <p v-if="props.post.replyTo" class="text-sm">
            <span class="text-gray-500">
              Replying to
            </span>
            <span class="text-green-700">
              @{{ props.post.replyTo.author.username }}
            </span>
          </p>
        </div>
      </div>
      <div v-else class="flex p-4">
        <div>
          <img :src="author.profileImage" alt="" class="w-6 h-6 rounded-full" @click="redirectToProfile(post)" />
        </div>
        <div class="ml-3">
          <span class="font-medium text-gray-800 dark:text-white hover:underline" @click="redirectToProfile(post)">
            {{ author.name }}
          </span>
          <span class="ml-3 font-medium text-gray-400 dark:text-white">
            <nuxt-link :to="toProfileUrl" class="hover:underline">
              @{{ author.username }}
            </nuxt-link>
            . {{ props.post.postedAtHuman }}
          </span>
          <p v-if="props.post.replyTo" class="text-sm">
            <span class="text-gray-500">
              Replying to
            </span>
            <nuxt-link :to="replyToPostUrl" class="text-green-700">
              @{{ props.post.replyTo.author.username }}
            </nuxt-link>
          </p>
        </div>
        <div v-if="user.id == post.author.id" class="ml-auto">
          <button class="w-5 h-5 relative" @click="toggleMenu">
            <EllipsisVerticalIcon class="text-gray-500 hover:text-black" />
            <div v-if="showMenu" class="absolute right-0 w-19 p-2 mr-2 bg-white rounded-md shadow-lg">
              <button class="text-sm text-gray-700 hover:bg-gray-100 flex items-center" @click="deletePostfun(post.id)">
                <TrashIcon class="w-4 h-4 mr-1" /><span>Delete</span>
              </button>
            </div>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { EllipsisVerticalIcon } from "@heroicons/vue/24/solid"
  import { TrashIcon } from "@heroicons/vue/24/outline"
  import { ref } from 'vue'
  const deleted = ref(false)
  
  const { useAuthUser } = useAuth()
  const user = useAuthUser()
  const { deletePost } = usePosts()

  const props = defineProps({
    post: {
      type: Object,
      required: true
    },
  })
  
  const showMenu = ref(false)
  
  function redirectToProfile(post) {
    navigateTo({
      path: `/profile/${post.author.username}`
    })
  }
  
  const author = props.post.author
  const replyToPostUrl = computed(() => `/status/${props.post.replyTo.id}`)
  const toProfileUrl = computed(() => `/profile/${props.post.author.username}`)

  function toggleMenu() {
    showMenu.value = !showMenu.value
  }

  async function deletePostfun(deletePostId) {
    deleted.value = true
    await deletePost(deletePostId);
    navigateTo({
      path: `/`
    });
  }
  
  // Hide the menu when clicked outside
  window.addEventListener('click', (event) => {
    if (!event.target.closest('.w-5')) {
      showMenu.value = false
    }
  })
  </script>
  