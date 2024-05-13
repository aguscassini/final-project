<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js';

const userStore = useUserStore();

const email = ref('')
const password = ref('')
const confirmPassword = ref("")

function signUp(email, password, confirmPassword){
    if(password === confirmPassword) userStore.signUp(email, password)
    else console.error("Las passwords no son iguales")
}

</script>

<template>
  <form class = "container" @submit.prevent="signUp(email, password, confirmPassword)">
      <h1>Sign Up</h1>
      <div class="form-group">
        <input v-model="email" type="email" id="email" placeholder="Email" />
      </div>

      <div class="form-group">
        <input v-model="password" type="password" id="password" placeholder="Password" />
      </div>

      <div class="form-group">
        <input v-model="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm password" />
      </div>
      <div class="form-group">
        <button type="submit">Sign Up</button>
      </div>
      
  </form>
</template>

<style scoped>

.container {

  max-width: 400px;
  margin: 150px auto 30px auto;
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

.container button {
  width: 100%;
  padding: 12px;
  background-color: #57d9c1;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

</style>