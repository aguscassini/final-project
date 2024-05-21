<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/task.js';

const userStore = useUserStore()
const taskStore = useTaskStore();
const router = useRouter();

const email = ref('')
const password = ref('')

async function checkUser(email, password) {
  try {
    await userStore.signIn(email, password); 
    await taskStore.fetchTasks();
    router.push({ path: '/' });
  } catch (error) {
    console.error('Error during sign-in:', error);
    alert(error.message)  

  }
}

</script>

<template>
  <section class="container">
    <img src="../assets/icons/auth_img.svg" alt="logo" >
  <form  @submit.prevent="checkUser(email, password)">
    <h1>Sign In</h1>
    <div class="form-group">
      <input v-model="email" type="email" placeholder="Email" />
    </div>
    <div class="form-group">
      <input v-model="password" type="password" placeholder="Password" />
    </div>
    <div class="form-group">
      <button type="submit">Log In</button>
    </div>
  </form>
</section>
</template>

<style scoped>

.container {
  max-width: 500px;
  margin: 100px 50px 0px 50px;
  padding: 40px 50px;
  background-color: var(--ultralight-blue);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container img {
  width: 110%; 
  height: auto;
  margin-bottom: 30px;
}

.container form {
  width: 100%; 
}

.container h1 {
  font-size: 18px;
  color: var(--dark-blue);
  margin: 20px 0; 
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

input[type='password'],
input[type='email'] {
  width: 100%;
  padding: 12px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
}

.container button {
  width: 100%;
  padding: 12px;
  background-color: var(--orange);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  align-self: center; 
}

.container button:hover {
  background-color: var(--light-blue);
}
</style>


