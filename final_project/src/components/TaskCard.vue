<script setup>
import {useTaskStore} from '@/stores/task'
import { defineProps,defineEmits } from 'vue';

const taskStore = useTaskStore()

const props = defineProps({
    task: Object
})

const emit = defineEmits(['delete-task','edit-task'])


function deleteTask(taskId) {
    emit('delete-task', taskId)
}

function editTask(taskId) {
  emit('edit-task', taskId);
}
</script>

<template>
    <section>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <button @click="deleteTask(task.id)">Delete </button>
        <button @click="editTask(task.id)">Edit </button>


    </section>
</template>

<style scoped>
h3{
    font-size: 20px;
}
 p{
    font-size: 15px;
 }

button{
    background-color: #57d9c1;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}

    
</style>

