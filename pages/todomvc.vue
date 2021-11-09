<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js/dist/main/index.js'
import { store } from '../store.js'

const { supabaseUrl, supabasePublicKey } = useRuntimeConfig()
const supabase = createClient(supabaseUrl, supabasePublicKey)

const newTask = ref('')

const taskList = ref([])

const getTasks = async () => {
  let { data: todos, error } = await supabase.from('todos').select('*')

  taskList.value = todos
}

const addTask = async () => {
  try {
    const { data, error } = await supabase.from('todos').insert([
      {
        user_id: store.user.id,
        task: newTask.value,
        is_complete: false
      }
    ])
    if (error) throw error
    getTasks()
  } catch (error) {
    console.error(error)
  }
}

const updateTaskCompletion = async task => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_complete: !task.is_complete })
      .eq('id', task.id)
    if (error) throw error
    console.log(data)
    getTasks()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <h1>TodoMVC</h1>
  <input type="text" v-model="newTask" @keyup.enter="addTask" />
  <h2>List of Tasks</h2>
  <ul>
    <li v-for="(task, index) in taskList" :key="task.task + index">
      <input
        type="checkbox"
        v-model="task.is_complete"
        @click="updateTaskCompletion(task)"
      />
      {{ task.task }}
    </li>
  </ul>
</template>

<style></style>
