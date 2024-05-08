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
    <div>
      <input v-model="email" type="email" placeholder="Email" />
    </div>
    <div>
      <input v-model="password" type="password" placeholder="Password" />
    </div>
    <div>
      <button type="submit">Log In</button>
      <p></p>
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
}
</style>
