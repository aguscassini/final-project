import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null
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
      if (error) throw error
      this.user = data.user
    },

    async logOut() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error during logout:', error.message)
      } else {
        this.user = null
        router.push('/auth')
      }
    },

    async fetchProfile() {
      if (!this.user) return; // verifica si usuario esta definido
    
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .match({user_id: this.user.id})
        .single()

        if (error) {
          console.error('Error fetching profile:', error.message);
          return;
        }

      this.profile = data;

    },

    async createProfile(user, username) {
      const { data, error } = await supabase.from('profiles').insert([
        {
          user_id: this.user.id,
          email: this.user.email,
          username: username,
          avatar_url: user.avatar_url
        }
      ])

      if (error) throw error
    }
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
