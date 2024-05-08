<script setup>
import { ref } from 'vue'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'

const hasUser = ref(true)
function toggleUser() {
  hasUser.value = !hasUser.value
}
</script>

<template>
  <section>
    <article v-if="hasUser">
      <SignIn></SignIn>
      <div>
      <button @click="toggleUser"> I don't have an account</button>
    </div>
    </article>
    <article v-else>
      <SignUp></SignUp>
    <div >
      <button @click="toggleUser"> I already have an account </button>
    </div>
    </article>
  </section>
</template>

<style scoped>







button{
  border:none;
  background-color: transparent;
  font-size: 12px;
}
</style>
