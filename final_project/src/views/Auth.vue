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
      <div>
        <button class="toggle-button" @click="toggleUser">I don't have an account</button>
      </div>
    </article>
    <article v-else>
      <SignUp></SignUp>
      <div>
        <button class="toggle-button" @click="toggleUser">I already have an account</button>
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
  width: 100%;
  border:none;
  background-color: transparent;
  text-decoration: none;
  font-size: 15px;
  color: var(--light-blue);
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  margin-bottom: 100px;
}
</style>
