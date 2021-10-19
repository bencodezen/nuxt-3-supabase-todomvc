<script setup>
import { reactive } from 'vue'
import { createClient } from '@supabase/supabase-js/dist/main/index.js'

const { supabaseUrl, supabasePublicKey } = useRuntimeConfig()

const supabase = createClient(supabaseUrl, supabasePublicKey)

const loginState = reactive({
  email: '',
  password: '',
  user: null,
  error: null
})

const signUp = async () => {
  let { user, error } = await supabase.auth.signUp({
    email: loginState.email,
    password: loginState.password
  })

  loginState.user = user
  loginState.error = error

  console.log({ loginState })
}
</script>

<template>
  <h1>Sign Up</h1>
  <form @submit.prevent>
    <div>
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="loginState.email"
        placeholder="Email"
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="loginState.password" />
    </div>
    <div>
      <button @click="signUp">Sign Up</button>
    </div>
  </form>
</template>
