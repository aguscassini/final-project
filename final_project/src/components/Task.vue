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
    })
    taskToEdit.value = null
    isEditing.value = !isEditing.value
  }
}

function getCurrentDate() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const daySuffixes = ['st', 'nd', 'rd', 'th']

  const currentDate = new Date()
  const dayOfWeek = daysOfWeek[currentDate.getDay()]
  const month = months[currentDate.getMonth()]
  const dayOfMonth = currentDate.getDate()
  const suffixIndex = (dayOfMonth - 1) % 10 > 3 ? 3 : (dayOfMonth - 1) % 10
  const daySuffix = daySuffixes[suffixIndex]

  return `${dayOfWeek} ${month} ${dayOfMonth}${daySuffix}`
}

const completedTasks = computed(() => tasks.value.filter((task) => task.is_complete))
const incompleteTasks = computed(() => tasks.value.filter((task) => !task.is_complete))

</script>

<template>
  <div class="total-box">
    <h2>Hi @profile!</h2>

    <form class="form-box" @submit.prevent="newSubmitTask">
      <img src="../assets/icons/task_icon.svg" alt="Task Icon" />
      <h3>Do you have any new task?</h3>
      <p>{{ getCurrentDate() }}</p>

      <input v-model="newTaskTitle" type="text" placeholder="Title" required />
      <input v-model="newTaskDescription" type="text" placeholder="Description"/>
      <button type="submit">Add Task</button>
    </form>
    <div v-if="!tasks">
      <p>No tasks available</p>
    </div>
    <article class="box-section">
      <section class="incomplete-section">
        <h4>Incomplete Tasks</h4>
        <div class="task-design">
          <div v-for="task in incompleteTasks" :key="task.id" class="task-card">
            <TaskCard
              :task="task"
              @delete-task="deleteTask"
              @edit-task="editTask"
              @save-edited-task="saveTask"
            ></TaskCard>
          </div>
        </div>
      </section>
      <section class="completed-section">
        <h4>Completed Tasks</h4>
        <div class="task-design">
          <div v-for="task in completedTasks" :key="task.id" class="task-card">
            <TaskCard
              :task="task"
              @delete-task="deleteTask"
              @edit-task="editTask"
              @save-edited-task="saveTask"
            ></TaskCard>
          </div>
        </div>
      </section>
    </article>
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

img {
  width: 120px;
  height: 120px;
  margin: 0 0 30px 0;
}

h2 {
  margin: 100px 0 30px 0;
  font-size: 20px;
  width: 100%;
  color: var(--red);
  text-align: center;
}

.form-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 300px 50px 300px;
  width: 80%;
  height: 50%;
  padding: 40px;
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
  margin-bottom: 50px;
  font-style: italic;
}
.form-box input {
  width: 100%;
  height: 10vh;
  padding: 15px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
  box-sizing: border-box;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
  
}

.form-box button[type='submit'] {
  width: 100%;
  height: 10vh;
  padding: 15px;
  background-color: var(--ultralight-blue);
  color: var(--dark-blue);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 15px;
}

.form-box button:hover {
  background-color: var(--light-blue);
}

.box-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin: 0 100px;
}

.completed-section {
  width: 100%;
  height: auto;
  background-color: var(--red);
  border-radius: 20px;
  margin-bottom: 100px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}


.incomplete-section {
  width: 100%;
  height: auto;
  background-color: var(--orange);
  border-radius: 20px;
  margin-bottom: 100px;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.completed-section h4,
.incomplete-section h4 {
  font-size: 18px;
  color: white;
  margin: 40px 60px 20px 60px;
  font-weight: normal;
  text-align: center;
}

.task-design {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  
}

@media (max-width: 365px) and (max-height: 367px) {
  img {
    width: 100px;
    height: 100px;
  }

  h2 {
    font-size: 15px;
  }

  .form-box {
    width: 100%;
    padding: 20px;
  }

  .form-box h3 {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .form-box p {
    font-size: 12px;
    margin-bottom: 20px;
  }

  .form-box input {
    padding: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .form-box button[type='submit'] {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 14px;
  }

  .box-section {
    flex-direction: column;
  }

  .completed-section,
  .incomplete-section {
    width: 100%;
    height: auto;
  }

  .completed-section h4,
  .incomplete-section h4 {
    font-size: 15px;
  }

  .task-design {
    margin: 20px 0;
  }
}
</style>
