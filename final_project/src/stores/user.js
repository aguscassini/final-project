import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: ref({
      username: '',
      email: '',
      website: '',
      avatar_url: ''
    })
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser()
      this.user = user.data.user
    },

    async signUp(email, password, username) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        username: username,
        password: password
      })
      if (error) throw error
      if (data) this.user = data.user

      await this.createProfile(data.user, username)
      this.profile = { user_id: data.user.id, username: username, email: data.user.email }
    },

    async signIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) {
        console.error('Error during sign-in:', error.message)
        throw new Error('Invalid email or password')  
      }      this.user = data.user
      await this.fetchProfile()
    },

    async logOut() {
      try {
        // Guardar el perfil antes de cerrar sesión
        const updatedProfile = { 
          username: this.profile.value.username,
          email: this.profile.value.email,
          website: this.profile.value.website,
          avatar_url: this.profile.value.avatar_url
        }

        const { error: updateError } = await supabase
          .from('profiles')
          .update(updatedProfile)
          .match({ user_id: this.user.id })

        if (updateError) {
          console.error('Error updating profile during logout:', updateError.message)
          throw updateError
        }

        // Cerrar sesión
        const { error: signOutError } = await supabase.auth.signOut()
        if (signOutError) {
          console.error('Error during logout:', signOutError.message)
          throw signOutError
        }

        this.user = null
        this.task = null
        this.profile.value = {
          username: '',
          email: '',
          website: '',
          avatar_url: ''
        }

        router.push('/auth')
      } catch (error) {
        console.error('Error during logout process:', error.message)
      }
    },

    async fetchProfile() {
      if (!this.user) return; 
    
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .match({user_id: this.user.id})
        .single()

        if (error) {
          console.error('Error fetching profile:', error.message);
          return;
        }

      this.profile.value = data;

    },

    async createProfile(user, username) {
      const { error } = await supabase.from('profiles').insert([
        {
          user_id: user.id,
          email: user.email,
          username: username,
          avatar_url: user.avatar_url
        }
      ])

      if (error) throw error
    },
    async updateProfile(newProfileData) {
      const { data, error } = await supabase
        .from('profiles')
        .update(newProfileData)
        .match({ user_id: this.user.id });
    
      if (error) {
        console.error('Error updating profile:', error.message);
        return null; 
      }
    
      this.profile = { ...this.profile, ...newProfileData };
    
      return data; 
    },
  },



  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})

async function saveProfileBeforeLogout(userStore) {
  const updatedProfile = { 
    username: userStore.profile.value.username,
    email: userStore.profile.value.email,
    website: userStore.profile.value.website,
    avatar_url: userStore.profile.value.avatar_url
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updatedProfile)
    .match({ user_id: userStore.user.id })

  if (error) {
    console.error('Error updating profile during logout:', error.message)
    throw error
  }
  
  return data
}