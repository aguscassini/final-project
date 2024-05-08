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
      <p @click="toggleUser">I don't have an account </p>
    </article>
    <article v-else>
      <SignUp></SignUp>
      <p @click="toggleUser"> I already have an account</p>
    </article>
  </section>
</template>

<style scoped>

</style>
