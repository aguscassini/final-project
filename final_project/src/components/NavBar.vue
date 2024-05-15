<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <nav >
    <ul class="nav-bar">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
      <li>
        <button @click="userStore.logOut">Log Out</button>
      </li>
    </ul>
  </nav>
</template>

<style scooped>
.nav-bar {
  padding: 20px 40px 20px 40px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  background-color: var(--orange);
}

.nav-bar li {
  list-style: none;
  list-style-type: none;
  text-decoration: none;
  gap: 18px;
  color: white;
  font-size: 18px;
}

.nav-bar li:hover {
  color: var(--light-blue);
}

.nav-bar a {
  text-decoration: none; 
  color: inherit; 
}

button {
  color: white;
  border: none;
  cursor: pointer;
  padding: 0 20px;
  background-color: transparent;
  font-size:18px;
}

button:hover {
  color: var(--light-blue);
}

</style>
