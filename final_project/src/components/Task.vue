<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '../stores/task.js'
import { supabase } from '../supabase'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const tasks = ref([])
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const userStore = useUserStore()

async function fetchTasks() {
  const { data: fetchedTasks } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: false })
  tasks.value = fetchedTasks || []
}

onMounted(fetchTasks)

async function editTask(task) {
  // Lógica para editar la tarea
}

async function deleteTask(task) {
  // Lógica para eliminar la tarea
}

async function submitTask() {
  if (newTaskTitle.value.trim() !== '') {
    const { data, error } = await supabase.from('tasks').insert([
      {
        user_id: userStore.user.data.user.id,
        title: newTaskTitle.value,
        description: newTaskDescription.value
      }
    ])
    if (error) {
      console.error('Error adding a task:', error.message)
    } else {
      newTaskTitle.value = ''
      newTaskDescription.value = ''
      await fetchTasks()
      router.push('/')
    }
  }
}
</script>

<template>
  <div>
    <h2>SUMMER 2024</h2>
    <form @submit.prevent="submitTask">
      <h3>New Task</h3>
      <input v-model="newTaskTitle" type="text" placeholder="Title" required />
      <textarea v-model="newTaskDescription" placeholder="Description"></textarea>
      <button type="submit">Add Task</button>
    </form>
    <div v-if="tasks.length === 0">
      <p>No tasks available</p>
    </div>
    <div v-else class="task_design">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
    </div>
  </div>

  <!--  <div>
          <button @click="editTask(task)">Editar</button>
          <button @click="deleteTask(task)">Eliminar</button>
        </div> -->
</template>

<style scoped>



.task_design {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.task-card {
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  width: 200px;
  height: 100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.task-card h3 {
  margin-top: 0;
  font-size: 14px;
}

.task-card p {
  margin-bottom: 10px;
  font-size: 12px;
}

form {
  margin: 20px 20px;
  border: none;
  padding: 20px 20px;
  background-color: white;
  width: 300px;
  height: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form h2 {
font-size: 15px;
}

form input,
form textarea {
  display: block;
  width: 90%;
  margin: 15px;
  padding:10px 10px;
}

form button {
  background-color: #57d9c1;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
