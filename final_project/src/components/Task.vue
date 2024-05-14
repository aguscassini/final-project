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
  <div class="total-box">
    <h2>Welcome </h2>

    <form class="form-box" @submit.prevent="newSubmitTask">
      <h3>Add a new task</h3>
      <input v-model="newTaskTitle" type="text" placeholder="Title" required />
      <textarea v-model="newTaskDescription" placeholder="Description"></textarea>
      <button type="submit">Add Task</button>
    </form>
    <div v-if="!tasks">
      <p>No tasks available</p>
    </div>
    <div class="task-design">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask"@save-edited-task="saveTask" ></TaskCard>
      </div>
    </div>
  </div>
</template>

<style scoped>

.total-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

h2 {
  margin: 50px auto 0 auto;
  font-size: 20px;
  width: 100%;
  color: var(--light-blue);
  text-align: center;
}

.form-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0px;
  width: 40%;
  height: 40vh;
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  max-width: 90%;
}

.form-box h3 {
  font-size: 20px;
  color: var(--orange);
  margin-bottom: 30px;
}

.form-box input,
.form-box textarea {
  width: 100%; 
  padding: 12px;
  border: 1.5px solid var(--orange);
  border-radius: 20px;
  background-color: white;
  outline: none;
  margin-bottom: 10px;
  box-sizing: border-box; 
}

.form-box button[type='submit'] {
  width: 100%;
  padding: 12px;
  background-color: var(--orange);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.form-box button:hover{
  background-color: var(--light-blue);

}
.task-design { 

  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
}
</style>
