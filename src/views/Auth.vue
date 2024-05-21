<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'

const router = useRouter()
const hasUser = ref(true)

function toggleUser() {
  hasUser.value = !hasUser.value
}
</script>

<template>
  <section class="main-box">
  
    <article v-if="hasUser">
      <SignIn></SignIn>
        <div class="toggle-button">
        <p>I don't have an account</p>
        <a href="#" @click="toggleUser">Sign Up</a>
      </div>
    </article>
    <article v-else>
      <SignUp></SignUp>
      <div class="toggle-button">
      <p>I already have an account</p>
        <a href="#" @click="toggleUser">Sign In</a>
      </div>
    </article>
  </section>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  height: 100vh; 
}

.toggle-button {
  display:flex;
  flex-direction: row;  
  gap: 5px;
  justify-content: center;
  width: 100%;
  border:none;
  background-color: transparent;
  text-decoration: none;
  font-size: 13px;
  color: var(--light-blue);
  cursor: pointer;
  text-align: center;
  margin-bottom: 100px;
}

a {
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
  color: var(--light-blue);
}
</style>
