<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js';

const userStore = useUserStore();

const email = ref('')
const password = ref('')
const confirmPassword = ref("")

function signUp(){
    if(password.value === confirmPassword.value) userStore.signUp(email, password)
    else console.error("Las passwords no son iguales")
}
</script>

<template>
  <form class = "container" @submit.prevent="signUp">
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
  height: 450px;
  margin: 100px 100px;
  background-color: white;
  padding: 60px 60px 60px 60px;
  margin-bottom: 20px;
  justify-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}
.container h1 {
  font-size: 15px;
  color: #292e47;
  padding-bottom: 20px;
}

.container label {
  display: block;
  color: #f07d309d;
  font-size: 12px;
  padding-bottom: 20px;
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
}</style>