<template>
  <div class="relative" :class="{'dark': darkMode}">
    <UIToast/>
    <div class="bg-white dark:bg-dim-900">
      <UILoadingPage v-if="isAuthLoading" />
      <div v-else-if="user" class="min-h-full">
        <div class="flex">
          <!-- Left Sidebar --> 
          <div class="hidden md:block pl-2 pr-2 flex-none border-r-2 dark:border-gray-700">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- Bottom Sidebar -->
          <div class="md:hidden flex z-10">
            <div class="fixed bottom-0 border-t-2 w-full bg-slate-50
            dark:border-gray-700 dark:bg-gray-800">
              <SidebarBottom/>
            </div>  
          </div>
          <!-- Main Content -->
          <main class="flex-auto w-4/5">
            <router-view />
          </main>
          <!-- Right Sidebar -->
          <div class="hidden md:block flex-auto sm:p-2 2xl:m-5 md:w-2/5 xl:w-1/5 md:min-w-md border-l-2 dark:border-gray-700">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <AuthPage v-else/>
      <UIModal :isOpen="postModal" @on-close="handleModalClose">
        <PostItem :post="replyPost" hideActions/>
        <PostForm :user="user" :reply-to="replyPost"  @on-success="handleFormSuccess"/>
      </UIModal>
    </div>
  </div>
</template>

<script setup>
  let darkMode = ref(false)

  const viewMode = ref(false)
  const {closePostModal,usePostModal,useReplyPost} = usePosts()
  const { useAuthUser,initAuth, useAuthLoading } = useAuth()
  const isAuthLoading = useAuthLoading()
  const emitter = useEmitter()

  emitter.$on('toggleDarkMode',()=>{
    darkMode.value = !darkMode.value
    if (process.client) {
      window.localStorage.setItem('darkMode', darkMode.value)
    }
  })

  const postModal = usePostModal()
  const replyPost = useReplyPost()

  const user = useAuthUser()
  onBeforeMount(() => {
    initAuth()
  })

  onMounted(() => {
    if (process.client) {
      darkMode.value = window.localStorage.getItem('darkMode') === 'true'
    }
  })

  function handleFormSuccess(post){
    closePostModal()
    navigateTo({ 
        path: `/status/${post.id}`
    })
  }
  function handleModalClose(){
      closePostModal()
  }
</script>
