<template>
  <title>Settings</title>
    <div class="h-screen">
      <div class="sticky z-10 top-0 px-4 py-3 bg-white/80 backdrop-blur-md
          dark:bg-dim-900/80">
              <h2 class="text-xl font-bold text-gray-800 
              dark:text-gray-100">
                  Settings
              </h2>
      </div>
      <div class="m-2 space-y-2 justify-between border-2 p-5 rounded-2xl " :class="borderColor">
        <UIInput label="Name" v-model="data.name" :dark="darkMode"/>
        <UIInput label="Username" v-model="data.username" disabled :dark="darkMode"/>
        <UIInput label="Email" v-model="data.email" disabled :dark="darkMode"/>
        <UIInput label="Old Password" v-model="data.oldpassword" placeholder="••••••••" :dark="darkMode"/>
        <UIInput label="New Password" v-model="data.newpassword" placeholder="••••••••" :dark="darkMode"/>
        <UIInput label="Repeat New Password" v-model="data.repeatpassword" placeholder="••••••••" :dark="darkMode"/>
        <UIInput label="About" v-model="data.bio" :dark="darkMode"/>
        <div class="flex justify-stretch items-center pt-2">
          <label for="darkModeToggle" class="mr-2 dark:text-white">Dark Mode:</label>
          <button class="darkModeToggle bg-slate-500 text-white px-4 py-2 rounded-md" @click="handleDarkModeToggle">
            {{ darkMode ? 'On' : 'Off' }}
          </button>
        </div>
        <UIButton liquid @click="handleUpdateSave">Save</UIButton>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  const {borderColor } = userTailwindConfig()
  const {useAuthUser} = useAuth()
  const {updateUser} = useAuthor()
  const emitter = useEmitter()

  const user = useAuthUser()
  
  const darkMode = ref(JSON.parse(window.localStorage.getItem('darkMode')) || false)
  const data = reactive({
    name: user.value.name,
    username: user.value.username,
    email: user.value.email,
    oldpassword: "",
    newpassword: "",
    repeatpassword: "",
    profileImage: user.value.profileImage,
    bio: user.value.bio,
  })
  
  const handleDarkModeToggle = () => {
    darkMode.value = !darkMode.value
    emitter.$emit('toggleDarkMode', darkMode.value)
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
  }
  
  async function handleUpdateSave() {
    const updatedData = {};

    if (data.name !== user.value.name) {
      updatedData.name = data.name;
    }

    if (data.oldpassword && data.newpassword && data.repeatpassword) {
      updatedData.oldPassword = data.oldpassword;
      if(data.newpassword === data.repeatpassword){
        updatedData.newPassword = data.newpassword
      }
    }

    if (data.bio !== user.value.bio) {
      updatedData.bio = data.bio;
    }

    try {
      await updateUser(user.value.id,updatedData);
      emitter.$emit('toast', { message: 'Settings updated.', type: 'success' });
    } catch (error) {
      emitter.$emit('toast', { message: 'Error, While updating.', type: 'error' });
      console.log(error)
    }
  }
</script>
  