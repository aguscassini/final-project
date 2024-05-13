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


const emit = defineEmits(['delete-task', 'edit-task', 'save-edited-task',])

function deleteTask(taskId) {
  emit('delete-task', taskId)
}
function editTask(task) {
  isEditable.value = !isEditable.value
  if (!isEditable.value) {
    emit('save-edited-task', task)
  }
}
async function saveTask(taskId, editedTitle, editedDescription) {
  await taskStore.editTask(taskId, { title: editedTitle, description: editedDescription })
  isEditable.value = !isEditable.value
}


async function saveChanges(task) {
  await taskStore.completeTask(task.id, task.is_complete)
}



</script>

<template>
  <section>
    <div :class="{ 'task-card': true, 'completed': task.is_complete, 'incomplete': !task.is_complete }">
      <div v-if="isEditable">
        <input type="text" v-model="editedTitle" />
        <input type="text" v-model="editedDescription" />
      </div>

      <div v-else class="task-content">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <label for="completedCheckbox">Completed </label>
        <input id="completedCheckbox" type="checkbox" v-model="task.is_complete" @change="saveChanges(task)" />
        <div class="button-group">
          <button @click="deleteTask(task.id)">
            <img src="@/assets/icons/delete.svg" alt="Delete Task" />
          </button>
          <button @click="editTask(task)">
            <img src="@/assets/icons/edit.svg" alt="Edit Task" />
          </button>
          <button @click="saveTask(task.id, editedTitle, editedDescription)" v-if="isEditable">
            <img src="@/assets/icons/save.svg" alt="Save Task" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  font-size: 20px;
}
p {
  font-size: 15px;
}
.task-content {
    position: relative; /* Para posicionar los botones */
}

.button-group {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

button {
  background-color: #57d9c1;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.icon-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
}

.completed {
  background-color: rgb(213, 218, 213);
  
}
.incomplete {
  background-color: #ffffff; 
}

</style>
