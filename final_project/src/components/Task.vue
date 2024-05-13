<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/task.js'
import { storeToRefs } from 'pinia'
import TaskCard from './TaskCard.vue'

const newTaskTitle = ref('')
const newTaskDescription = ref('')
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const isEditing = ref(false)
const editedTask = ref({ title: '', description: '' })
const taskToEdit = ref(null)

const newSubmitTask = async () => {
  await taskStore.submitTask(newTaskTitle.value, newTaskDescription.value)
  newTaskTitle.value = ''
  newTaskDescription.value = ''
  await taskStore.fetchTasks()
}

async function deleteTask(taskId) {
  await taskStore.deleteTask(taskId)
}
function editTask(taskId) {
  const task = tasks.value.find((task) => task.id === taskId)
  if (task) {
    editedTask.value.title = task.title
    editedTask.value.description = task.description
    taskToEdit.value = task
    isEditing.value = !isEditing.value 
  }
}

async function saveTask() {
  if (taskToEdit.value !== null) {
    await taskStore.editTask(taskToEdit.value.id, {
      title: editedTask.value.title,
      description: editedTask.value.description
    });
    taskToEdit.value = null;
    isEditing.value = !isEditing.value; 
  }
}
</script>

<template>
  <div class="task-container">
    <h2>Welcome to you tasks</h2>

    <form @submit.prevent="newSubmitTask">
      <h3>New Task</h3>
      <input v-model="newTaskTitle" type="text" placeholder="Title" required />
      <textarea v-model="newTaskDescription" placeholder="Description"></textarea>
      <button type="submit">Add Task</button>
    </form>
    <div v-if="!tasks">
      <p>No tasks available</p>
    </div>
    <div class="task_design">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask"@save-edited-task="saveTask" ></TaskCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

h2 {
  font-size: 30px;
  margin: 50px auto 30px auto;
}

.task-container form {
  width: 50%; /* Para ocupar todo el ancho disponible */
  padding: 20px;
  background-color: white; 
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.task-container form h2 {
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.task-container form h3 {
  font-size: 20px;
  margin-bottom: 20px;
}

.task-container form input,
.task-container form textarea {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.task-container form button[type='submit'] {
  width: 100%;
  padding: 10px;
  background-color: #57d9c1;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.task_design {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;

}

.task-card {
  width: 250px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}
.icon-buttons button {
  margin: 5px;
}
.task-card h3 {
  margin: 10px;
  font-size: 14px;
  font-weight: bold;
}

.task-card p {
  margin: 20px;
  font-size: 12px;
}

</style>
