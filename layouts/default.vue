<script setup>
import { computed, ref, onMounted } from 'vue'
import { store } from '../store.js'

import { createClient } from '@supabase/supabase-js/dist/main/index.js'
const { supabaseUrl, supabasePublicKey } = useRuntimeConfig()
const supabase = createClient(supabaseUrl, supabasePublicKey)

const loading = ref(true)
const avatar_url = ref('')

async function getProfile() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', store.user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      website.value = data.website
      avatar_url.value = data.avatar_url
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

const navLinks = ref([
  {
    label: 'Home',
    url: '/'
  },
  {
    label: 'Login',
    url: '/login'
  },
  {
    label: 'Profile',
    url: '/profile'
  },
  {
    label: 'TodoMVC',
    url: '/todomvc'
  }
])

const displayedNavLinks = computed(() => {
  if (store.user?.aud === 'authenticated') {
    return navLinks.value.filter(item => item.label !== 'Login')
  } else {
    return navLinks.value.filter(item => item.label !== 'Profile')
  }
})

onMounted(() => {
  getProfile()
})
</script>

<template>
  <main>
    <nav>
      <ul class="nav-list">
        <li v-for="navItem in displayedNavLinks" :key="navItem.url">
          <nuxt-link :to="navItem.url">{{ navItem.label }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <slot></slot>
  </main>
</template>

<style scoped>
.nav-list {
  display: flex;
  list-style: none;
  padding: 1rem;
  margin: 0;
}

.nav-list li {
  margin-right: 1rem;
}
</style>
