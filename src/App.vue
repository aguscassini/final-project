<template>
  <section>
    <router-view /> <!-- your routes will load inside of these tags -->
  </section>
</template>

<script setup>


import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user.js'
import { useTaskStore } from './stores/task.js'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const taskStore = useTaskStore ()

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      await taskStore.fetchTasks()
      await userStore.fetchProfile()
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e)
  }
})


</script>

