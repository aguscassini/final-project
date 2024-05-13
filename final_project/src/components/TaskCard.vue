<script setup>
import { useTaskStore } from '@/stores/task'
import { defineProps, defineEmits, ref } from 'vue'

const taskStore = useTaskStore()
const isEditable = ref(false);

const props = defineProps({
  task: Object
})

const emit = defineEmits(['delete-task', 'edit-task', 'save-edited-task'])

function deleteTask(taskId) {
  emit('delete-task', taskId)
}
function editTask(task) {
  isEditable.value = !isEditable.value;
  if (!isEditable.value) {
    emit('save-edited-task', task);
  }
}
async function saveTask(taskId, editedTitle, editedDescription) {
  await taskStore.editTask(taskId, { title: editedTitle, description: editedDescription });
  isEditable.value = !isEditable.value;
}
</script>

<template>
<section>
    <div v-if="isEditable">
      <input type="text" v-model="editedTitle" />
      <input type="text" v-model="editedDescription" />
    </div>
    <div v-else>
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
    </div>
    <button @click="deleteTask(task.id)">Delete</button>
    <button @click="editTask(task)">Edit</button>
    <button @click="saveTask(task.id, editedTitle, editedDescription)" v-if="isEditable">Save</button>
  </section>
</template>

<style scoped>
h3 {
  font-size: 20px;
}
p {
  font-size: 15px;
}

button {
  background-color: #57d9c1;
  color: white;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
