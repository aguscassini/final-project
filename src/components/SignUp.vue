<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref('')
const password = ref('')
const confirmPassword = ref("")
const username = ref('')

async function signUp(){
    try {
        if (password.value === confirmPassword.value) {
            await userStore.signUp(email.value, password.value, username.value);
            console.log('User signed up successfully.');
            alert('Registration successful! Please check your email to verify your account.');
            router.push({ path: '/' });
        } else {
            console.error("Las contraseñas no coinciden");
        }
    } catch (error) {
        console.error("Error during sign-up:", error.message);
    }
}

</script>

<template>
   <section class="container">
    <img src="../assets/icons/auth_img.svg" alt="logo" >
  <form @submit.prevent="signUp(username, email, password, confirmPassword)">
      <h1>Sign Up</h1>
      <div class="form-group">
        <input v-model="username" type="text" id="username" placeholder="Username" />
      </div>
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
   </section>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 200px 50px 0px 50px;
  padding: 40px 50px;
  background-color: var(--ultralight-blue);
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(73, 61, 61, 0.1);
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
input[type='text'] ,
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

