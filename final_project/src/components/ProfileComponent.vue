<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { storeToRefs } from 'pinia'


const userStore = useUserStore()
const { profile } = storeToRefs(userStore)

const updateProfile = async () => {
  try {
    const updatedProfile = { 
      username: profile.value.username,
      email: profile.value.email,
      website: profile.value.website,
      avatar_url: profile.value.avatar_url
    }
    await userStore.updateProfile(updatedProfile)
    alert('Your profile has been updated!')
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
onMounted(async () => {
  if (userStore.user) {
    await userStore.fetchProfile()
  }
})
</script>

<template>
  <article class="profile-box" v-if="profile.value">
    <form class="profile-form-group" @submit.prevent="updateProfile">
      <h2>Profile</h2>
      <div>
        <input v-model="profile.value.username" placeholder="Username" type="text" id="username" />
      </div>
      <div>
        <input v-model="profile.value.email" placeholder="Email" type="email" id="email" />
      </div>
      <div>
        <input v-model="profile.value.website" placeholder="Website" type="text" id="website" />
      </div>
      <div>
        <input v-model="profile.value.avatar_url" placeholder="Avatar URL" type="text" id="avatar-url" />
      </div>
      <div v-if="profile.value.avatar_url">
        <img :src="profile.value.avatar_url" alt="avatar" class="avatar-image" />
      </div>
      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  </article>
</template>

<style scoped>
.profile-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-form-group{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 45px 50px 45px;
  max-width: 600px;
  height: 50%;
  padding: 40px;
  background-color: var(--dark-blue);
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.profile-form-group h2{
  font-size: 20px;
  font-weight: normal;
  color: var(--orange);
  margin-bottom: 30px;
}


.profile-form-group input {
  width: 100%;
  padding: 15px;
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 20px;
  box-sizing: border-box;
  font-size: 15px;
  font-family: 'Open Sans', sans-serif;
}

.profile-form-group button[type='submit'] {
  width: 100%;
  padding: 15px;
  background-color: var(--ultralight-blue);
  color: var(--dark-blue);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 15px;
}

.profile-form-group button:hover {
  background-color: var(--light-blue);
}

.avatar-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin: 10px 0 30px 0;
  }


</style>
