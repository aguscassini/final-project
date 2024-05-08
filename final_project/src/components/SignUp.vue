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
      <div>
        <input v-model="email" type="email" id="email" placeholder="Email" />
      </div>

      <div>
        <input v-model="password" type="password" id="password" placeholder="Password" />
      </div>

      <div>
        <input v-model="confirmPassword" type="password" id="confirmPassword" placeholder="Confirm password" />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
      
  </form>
</template>

<style scoped>

.container {
  width: 400px;
  height: 400px;
  margin: 100px 100px;
  background-color: white;
  padding: 60px 60px 60px 60px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}
.container h1 {
  font-size: 15px;
  color: #57d9c1;
  padding-bottom: 40px;
}

input[type='password'],
input[type='email'] {
  display: block;
  box-sizing: border-box;
  width: 90%;
  font-size: 12px;
  color: #6b708d;
  padding: 10px;
  border: none;
  margin-bottom: 20px;
  background-color: #eaebed;
}

.container button {
  display: block;
  width: 90%;
  padding: 10px;
  background-color: #57d9c1;
  color: white;
  border: none;
  cursor: pointer;
}

</style>