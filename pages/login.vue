<script setup>
import { reactive, ref } from 'vue'
import { createClient } from '@supabase/supabase-js/dist/main/index.js'

const { supabaseUrl, supabasePublicKey } = useRuntimeConfig()

const supabase = createClient(supabaseUrl, supabasePublicKey)

const loginState = reactive({
  email: ''
})

const loading = ref('')

const login = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signIn({ email: loginState.email })
    if (error) throw error
    alert('Check email for login link')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
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
      <button @click="login">Login</button>
    </div>
  </form>
</template>
