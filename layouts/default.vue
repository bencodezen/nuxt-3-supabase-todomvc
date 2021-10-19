<script setup>
import { ref } from 'vue'

const navLinks = ref([
  {
    label: 'Home',
    url: '/'
  },
  {
    label: 'Signup',
    url: '/signup'
  },
  {
    label: 'TodoMVC',
    url: '/todomvc'
  }
])
</script>

<template>
  <main>
    <nav>
      <ul class="nav-list">
        <li v-for="navItem in navLinks" :key="navItem.url">
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
