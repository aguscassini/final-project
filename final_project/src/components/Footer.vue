<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <div >
    <ul class="footer">
     
      <li><a href="#">About Us</a></li>
      <li><a href="#">Contact</a></li>

    </ul>
  </div>
</template>

<style scooped>
.footer {
  padding: 20px 40px 20px 40px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  background-color: var(--ultralight-blue);
}

.footer li {
  list-style: none;
  list-style-type: none;
  text-decoration: none;
  gap: 18px;
  color: white;
  font-size: 14px;
}



.footer a {
  text-decoration: none; 
  color: inherit; 
}



</style>
