<template>
    <div class="rounded-xl bg-white shadow-lg">
        <div class="pt-2 space-y-2 m-10 w-60 md:w-80 lg:w-96">
            <div class="w-full text-center pb-2">
                <div class="text-2xl font-bold">Register</div>
                <div>Join the best community for bulls.</div>
            </div>
            <!--<h2>Username : {{ data.username }}</h2>-->
            <UIInput label="Name" placeholder="full name"
            v-model="data.name"/>
            <UIInput label="Username" placeholder="@username"
            v-model="data.username"/>
            <UIInput label="Email" placeholder="mail@mail.com" type="email"
            v-model="data.email"/>
            <UIInput label="Password" placeholder="••••••••" type="password"
            v-model="data.password"/>
            <UIInput label="Repeat Password" placeholder="••••••••" type="password"
            v-model="data.repeatpassword"/>
            <UIInput label="About you" placeholder="500 characters..." 
            v-model="data.bio"/>
            <div class="pt-5">
                <button @click="handelRegister" class="w-full bg-prime-0 h-10 rounded-xl font-semibold">
                    Sign up
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const emitter = useEmitter();
const data = reactive({
    name: '',
    username: '',
    email: '',
    password: '',
    repeatpassword: '',
    profileImage: '',
    bio: '',
    loading: false
})

async function handelRegister(){
    const {register} = useAuth()
    data.loading = true
    try {
        await register({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatpassword,
        bio: data.bio
        })
        resetFields();
        emitter.$emit('toast', { message: 'Welcome, You can login now', type: 'success' });
    } catch (error) {
        emitter.$emit('toast', { message: 'Error, while registeration.', type: 'error' });
    }finally{
        data.loading = false
    }
}

function resetFields() {
  data.name = '';
  data.username = '';
  data.email = '';
  data.password = '';
  data.repeatpassword = '';
  data.bio = '';
}

</script>