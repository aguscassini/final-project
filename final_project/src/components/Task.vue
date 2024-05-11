<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/task.js'
import { storeToRefs } from 'pinia'
import TaskCard from './TaskCard.vue'


const newTaskTitle = ref('')
const newTaskDescription = ref('')
const taskStore = useTaskStore ()
const {tasks} = storeToRefs(taskStore)
const isEditing = ref(false);
const editedTask = ref({ title: '', description: '' });
const taskToEdit = ref(null);




const newSubmitTask = async () => {
  await taskStore.submitTask(newTaskTitle.value, newTaskDescription.value)
  newTaskTitle.value = ""
  newTaskDescription.value = ""
  await taskStore.fetchTasks()
}

async function deleteTask(taskId) {
  await taskStore.deleteTask(taskId)
}

function editTask(taskId) {
  const task = tasks.value.find(task => task.id === taskId); 
  if (task) {
    editedTask.value.title = task.title;
    editedTask.value.description = task.description;
    taskToEdit.value = task; // Asignamos la tarea al ref taskToEdit
    isEditing.value = true;
  }
}

async function saveEditedTask() {
  if (!taskToEdit.value) return; 
  await taskStore.editTask(taskToEdit.value.id, {
    title: editedTask.value.title,
    description: editedTask.value.description
  });
  isEditing.value = false;
  taskToEdit.value = null; // Reseteamos taskToEdit a null
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
    <div class="task_design">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask"></TaskCard>
      </div>
      <div v-if="isEditing">
        <h3>Edit Task</h3>
        <input v-model="editedTask.title" type="text" placeholder="Title" required />
        <textarea v-model="editedTask.description" placeholder="Description"></textarea>
        <button @click="saveEditedTask">Save </button>
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
  align-items: center;
}

.task-card {
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  width: 200px;
  height: 100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.task-card h3 {
  margin-top: 0;
  font-size: 14px;
  font-weight: bold;
}

.task-card p {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: normal;
}


form {
  margin: 20px 20px;
  border: none;
  padding: 20px 20px;
  background-color: white;
  width: 300px;
  height: 250px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

form h2 {
font-size: 15px;
font-weight: bold;
}

form h3 {
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 20px;
}

form input,
form textarea {
  display: block;
  width: 90%;
  margin: 15px;
  padding:10px 10px;
  border-radius: 5px;
}

form button[type="submit"] {
  background-color: #57d9c1;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
.edit-form {
  margin-top: 20px;
}

.edit-form button {
  background-color: #4caf50;
}
</style>
