<script setup>
const config = useRuntimeConfig()

const { supabaseUrl } = config

console.log(config)
</script>

<template>
  <div>
    <h1>Nuxt 3 Supabase TodoMVC</h1>
    <p>Supabase Url: {{ supabaseUrl }}</p>
  </div>
</template>
