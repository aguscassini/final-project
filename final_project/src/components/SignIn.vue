<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter();

const email = ref('')
const password = ref('')

async function checkUser(email, password) {
  try {
    await userStore.signIn(email, password); 
    router.push({ path: '/' });
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
}

</script>

<template>
  <form class="container" @submit.prevent="checkUser(email, password)">
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
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 150px auto 50px auto;
  
  background-color: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container h1 {
  font-size: 20px;
  color: #57d9c1;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

input[type='password'],
input[type='email'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #f8f8f8;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #57d9c1;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}


</style>