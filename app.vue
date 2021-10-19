<script setup>
import { createClient } from '@supabase/supabase-js/dist/main/index.js'

const { supabaseUrl, supabasePublicKey } = useRuntimeConfig()

const supabase = createClient(supabaseUrl, supabasePublicKey)

console.log(supabase)
</script>

<template>
  <div>
    <h1>Nuxt 3 Supabase TodoMVC</h1>
  </div>
</template>
