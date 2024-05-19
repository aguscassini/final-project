<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'


const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <nav >
    <ul class="nav-bar">
      <li><router-link to="/"> <img src="../assets/icons/home.svg" alt="home-icon"> </router-link></li>
      <li><router-link to="/profile"><img src="../assets/icons/profile.svg" alt="profile-icon"></router-link></li>
      <li>
        <button @click="userStore.logOut"><img src="../assets/icons/logout.svg" alt="logout-icon"></button>
      </li>
    </ul>
  </nav>
</template>

<style scooped>
.nav-bar {
  margin-bottom: 90px;
  padding: 15px 40px 15px 40px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content:center;
  gap: 100px;
  background-color: var(--light-blue);
}

.nav-bar li {
  list-style: none;
  list-style-type: none;
  text-decoration: none;
  gap: 18px;
  color: white;
  font-size: 18px;

}



.nav-bar a {
  text-decoration: none; 
  color: inherit; 
}

button {
  color: white;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size:18px;
}


.nav-bar img {
  width: 20px;
  height: 20px;
}
  
 
  .nav-bar img:hover {
  transform: scale(1.08); 
  transition: transform 0.3s ease;
  filter: brightness(0) sepia(1) hue-rotate(190deg) saturate(4) opacity(0.5);
}



</style>
