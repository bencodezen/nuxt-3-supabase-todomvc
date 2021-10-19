import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  publicRuntimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL
  },
  privateRuntimeConfig: {
    supabaseKey: process.env.SUPABASE_KEY
  }
})
