<script setup>
import { ref} from 'vue'
import { useTaskStore } from '../stores/task.js'
import { storeToRefs } from 'pinia'
import TaskCard from './TaskCard.vue'


const newTaskTitle = ref('')
const newTaskDescription = ref('')
const taskStore = useTaskStore ()
const {tasks} = storeToRefs(taskStore)




const newSubmitTask = async () => {
  await taskStore.submitTask(newTaskTitle.value, newTaskDescription.value)
  newTaskTitle.value = ""
  newTaskDescription.value = ""
  await taskStore.fetchTasks()
}

async function deleteTask(taskId) {
  await taskStore.deleteTask(taskId)
}




</script>

<template>
  <div>
    <h2>SUMMER 2024</h2>
    <form @submit.prevent="newSubmitTask">
      <h3>New Task</h3>
      <input v-model="newTaskTitle" type="text" placeholder="Title" required />
      <textarea v-model="newTaskDescription" placeholder="Description"></textarea>
      <button type="submit">Add Task</button>
    </form>
    <div v-if="!tasks">
      <p>No tasks available</p>
    </div>
    <div v-else class="task_design">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask"></TaskCard>
      </div>
    </div>
  </div>
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
