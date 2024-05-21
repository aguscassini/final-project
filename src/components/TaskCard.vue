<script setup>
import { useTaskStore } from '@/stores/task'
import { defineProps, defineEmits, ref } from 'vue'

const taskStore = useTaskStore()
const isEditable = ref(false)
const editedTitle = ref('')

const editedDescription = ref('')
const props = defineProps({
  task: Object
})

const emit = defineEmits(['delete-task', 'edit-task', 'save-edited-task'])

function deleteTask(taskId) {
  emit('delete-task', taskId)
}
function editTask(task) {
  isEditable.value = !isEditable.value
  if (isEditable.value) {
    editedTitle.value = task.title
    editedDescription.value = task.description
  } else {
    editedTitle.value = ''
    editedDescription.value = ''
    emit('save-edited-task', task)
  }
}
async function saveTask(taskId, editedTitle, editedDescription) {
  await taskStore.editTask(taskId, { title: editedTitle, description: editedDescription })
  isEditable.value = !isEditable.value
}

async function toggleCompletion(task) {
  await taskStore.completeTask(task.id, !task.is_complete)
}
</script>

<template>
  <section>
    <div v-if="isEditable" class="task-card">
      <input class="title-design" type="text" v-model="editedTitle" />
      <input class="description-design" type="text" v-model="editedDescription" />
      <div class="button-group">
        <button @click="saveTask(task.id, editedTitle, editedDescription)">
          <img src="@/assets/icons/save.svg" alt="Save Task" />
        </button>
      </div>
    </div>

    <div
      v-else
      :class="{
        'task-card completed': task.is_complete,
        'task-card incomplete': !task.is_complete
      }"
    >
      <h3 class="title-design">{{ task.title }}</h3>
      <p class="description-design">{{ task.description }}</p>
      <div class="button-group" v-if="!isEditable">
        <button @click="toggleCompletion(task)" class="completion-button">
          <img v-if="task.is_complete" src="@/assets/icons/done.svg" alt="Done" />
          <img v-else src="@/assets/icons/clock.svg" alt="In Process" />
        </button>

        <button @click="editTask(task)">
          <img src="@/assets/icons/edit.svg" alt="Edit Task" />
        </button>

        <button @click="deleteTask(task.id)">
          <img src="@/assets/icons/delete.svg" alt="Delete Task" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title-design {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--dark-blue);
}

.description-design {
  font-size: 15px;
  margin-bottom: 15px;
  color: var(--dark-blue);
}

.task-card {
  position: relative;
  width: 180px;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);


}
.task-card:hover {
  transform: scale(1.05); 
  transition: transform 0.3s ease;
}

.task-card input[type='text'] {
  width: 100%;
  border: 1px solid white;
  background-color: white;
}

.button-group {
  margin-top: 10px;
  display: flex;
}

.button-group button {
  background-color: var(--orange);
  color: white;
  padding: 3px 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 5px;
  width: auto;
  height: 40px;
}

.button-group button:hover {
  background-color: var(--light-blue);
}
.completion-button {
  width: 70px;
  height: 40px;
}

img {
  width: 20px;
  height: 20px;
}

.completed button {
  background-color: var(--red);
}




</style>
