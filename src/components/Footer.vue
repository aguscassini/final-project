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
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Contact</a></li>

    </ul>
  </div>
</template>

<style scooped>
.footer {
  margin-top: 90px;
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

.footer li:hover {
  transform: scale(1.08); 
  transition: transform 0.3s ease;
  filter: brightness(0) sepia(1) hue-rotate(190deg) saturate(4) opacity(0.5);

}

  
</style>
