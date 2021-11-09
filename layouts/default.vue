<script setup>
import { computed, ref } from 'vue'
import { store } from '../store.js'

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
