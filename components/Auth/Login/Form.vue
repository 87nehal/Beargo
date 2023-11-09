<template>
    <div class="rounded-xl bg-white shadow-lg">
        <div class="pt-2 space-y-2 m-10 w-60 md:w-80 lg:w-96">
            <div class="w-full text-center pb-2">
                <div class="text-2xl font-bold">Login</div>
                <div> Welcome back</div>
            </div>
            <!--<h2>Username : {{ data.username }}</h2>-->
            <UIInput label="Username" placeholder="@username"
            v-model="data.username"/>
            <!--<h2>Password : {{ data.password }}</h2>-->
            <UIInput label="Password" placeholder="********" type="password"
            v-model="data.password"/>
            <div class="pt-5">
                <button @click="handelLogin" class="w-full bg-prime-0 h-10 rounded-xl font-semibold">
                    Sign in
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const emitter = useEmitter();
const data = reactive({
    username: '',
    password: '',
    loading: false
})

async function handelLogin(){
    const {login} = useAuth()
    data.loading = true
    try {
        await login({
            username: data.username,
            password: data.password
        })
    } catch (error) {
        console.log(error)
        emitter.$emit('toast', { message: 'Check credentials', type: 'error' });
    }finally{
        data.loading = false
    }
}

</script>