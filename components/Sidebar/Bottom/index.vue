<template>
    <div class="flex w-full h-14 justify-between items-center">
        <SidebarLeftTab :active="currentPage === '/'" path="/">
          <template v-slot:icon>
            <HomeIcon :class="currentPage === '/' ? 'text-prime-0' : 'text-gray-500'"/>
          </template>
          <template v-slot:name>
            Home
          </template>
        </SidebarLeftTab>
  
        <SidebarLeftTab :active="currentPage === '/search'" path="/search">
          <template v-slot:icon>
            <MagnifyingGlassIcon :class="currentPage === '/search' ? 'text-prime-0' : 'text-gray-500'"/>
          </template>
          <template v-slot:name>
            Search
          </template>
        </SidebarLeftTab>
  
        <SidebarLeftTab :active="currentPage === '/messages'" path="/messages">
          <template v-slot:icon>
            <ChatBubbleOvalLeftIcon :class="currentPage === '/messages' ? 'text-prime-0' : 'text-gray-500'"/>
          </template>
          <template v-slot:name>
            Messages
          </template>
        </SidebarLeftTab>
  
        <SidebarLeftTab :active="currentPage === '/circles'" path="/circles">
          <template v-slot:icon>
            <UserGroupIcon :class="currentPage === '/circles' ? 'text-prime-0' : 'text-gray-500'"/>
          </template>
          <template v-slot:name>
            Circles
          </template>
        </SidebarLeftTab>
  
        <SidebarLeftTab :active="currentPage === '/trends'" path="/trends">
          <template v-slot:icon>
            <HashtagIcon :class="currentPage === '/trends' ? 'text-prime-0' : 'text-gray-500'"/>
          </template>
          <template v-slot:name>
            Trends
          </template>
        </SidebarLeftTab>
  
        <SidebarLeftTab :active="currentPage === '/settings'" path="/settings">
          <template v-slot:icon>
            <Cog6ToothIcon :class="currentPage === '/settings' ? 'text-prime-0' : 'text-gray-500'"/>
          </template>
          <template v-slot:name>
            Settings
          </template>
        </SidebarLeftTab>

        <div class="p-2 my-2 hover:bg-gray-200 rounded-full w-min dark:hover:bg-gray-800" :class="defaultTransition">
          <nuxt-link :to="toProfile">
            <div class="w-6 h-6 flex items-center justify-center overflow-hidden rounded-full">
              <img :src="user.profileImage" alt="" @click="showPopup = !showPopup">
            </div>
          </nuxt-link>
        </div>
  
    </div>
  </template>
  
  <script setup>
  import { HomeIcon,HashtagIcon, UserGroupIcon, Cog6ToothIcon,ChatBubbleOvalLeftIcon,InboxIcon,ArrowLeftOnRectangleIcon,MagnifyingGlassIcon } from "@heroicons/vue/24/outline"
  import { useRoute } from 'vue-router'
  const { useAuthUser,logout } = useAuth()
  const user = useAuthUser()
  
  const { defaultTransition } = userTailwindConfig()
  const route = useRoute()
  
  const currentPage = computed(() => route.path)
  const toProfile = computed(() => `/profile/${user.value.username}`)
  
  function handleLogout(){
    logout()
  }
  
  </script>
  