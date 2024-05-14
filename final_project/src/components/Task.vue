<script setup>
import { ref, computed } from 'vue'
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

function getCurrentDate() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daySuffixes = ['st', 'nd', 'rd', 'th'];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const suffixIndex = (dayOfMonth - 1) % 10 > 3 ? 3 : (dayOfMonth - 1) % 10;
  const daySuffix = daySuffixes[suffixIndex];

  return `${dayOfWeek} ${month} ${dayOfMonth}${daySuffix}`;
}

const completedTasks = computed(() => tasks.value.filter(task => task.is_complete))
const incompleteTasks = computed(() => tasks.value.filter(task => !task.is_complete))

</script>

<template>
  <div class="total-box">
    <img src="../assets/icons/task_icon.svg" alt="Task Icon" />
    <h2> Hi @profile! </h2>

    <form class="form-box" @submit.prevent="newSubmitTask">
      <h3>Do you have any new task?</h3>
      <p>{{ getCurrentDate() }}</p>

      <input v-model="newTaskTitle" type="text" placeholder="Title" required />
      <textarea v-model="newTaskDescription" placeholder="Description"></textarea>
      <button type="submit">Add Task</button>
    </form>
    <div v-if="!tasks">
      <p>No tasks available</p>
    </div>
    <section class="incomplete-section">
      <h4>Incomplete Tasks</h4>
      <div class="task-design">
        <div v-for="task in incompleteTasks" :key="task.id" class="task-card">
          <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask" @save-edited-task="saveTask"></TaskCard>
        </div>
      </div>
    </section>
    <section class="completed-section">
    <h4>Completed Tasks</h4>
      <div class="task-design">
        <div v-for="task in completedTasks" :key="task.id" class="task-card">
          <TaskCard :task="task" @delete-task="deleteTask" @edit-task="editTask" @save-edited-task="saveTask"></TaskCard>
        </div>
      </div>
    </section>

 
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

img{
  width: 180px;
  height: 180px;
  margin: 100px 0 50px 0;
}

h2 {
  font-size: 25px;
  width: 100%;
  color: var(--red);
  text-align: center;
}


.form-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0 50px 0px;
  width: 30%;
  height: 50vh;
  padding: 30px;
  background-color: var(--dark-blue);
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  max-width: 90%;
}

.form-box h3 {
  font-size: 20px;
  color: var(--orange);
  margin-bottom: 20px;
  font-weight: normal;
}

.form-box p {
  font-size: 15px;
  color: var(--ultralight-blue);
  margin-bottom: 30px;
font-style: italic;
  
}
.form-box input,
.form-box textarea {
  width: 100%; 
  padding: 15px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
  outline: none;
  margin-bottom: 20px;
  box-sizing: border-box; 
}

.form-box button[type='submit'] {
  width: 100%;
  padding: 15px;
  background-color: var(--orange);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.form-box button:hover{
  background-color: var(--light-blue);

}

.completed-section {
  width: 70%; 
  background-color: var(--red);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-bottom: 100px;

}

.incomplete-section {
  width: 70%; 
  background-color: var(--orange);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.completed-section h4, .incomplete-section h4 {
  font-size: 20px; 
  color: white; 
  margin: 40px 60px;
  font-weight: normal;

}


.task-design { 
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  color: var(--dark-blue);
}
</style>
