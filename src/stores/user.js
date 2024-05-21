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
      if (error) {
        console.error('Error during sign-in:', error.message)
        throw new Error('Invalid email or password')  
      }      this.user = data.user
      await this.fetchProfile()
    },
    async saveProfileBeforeLogout() {
      const updatedProfile = { 
        username: this.profile.username,
        email: this.profile.email,
        website: this.profile.website,
        avatar_url: this.profile.avatar_url
      };
    
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updatedProfile)
          .match({ user_id: this.user.id });
    
        if (error) {
          console.error('Error updating profile during logout:', error.message);
          throw error;
        }
    
        return data;
      } catch (error) {
        console.error('Error updating profile during logout:', error.message);
        throw error;
      }
    },
  
    async logOut() {
      try {
        await this.saveProfileBeforeLogout();
    
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          console.error('Error during logout:', signOutError.message);
          throw signOutError;
        }
        router.push('/auth');
        this.user = null;
       this.task = null;
        this.profile = null;
    
       
      } catch (error) {
        console.error('Error during logout process:', error.message);
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

      this.profile = data;

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
      const { error } = await supabase
        .from('profiles')
        .update(newProfileData)
        .match({ user_id: this.user.id });
    
      if (error) {
        console.error('Error updating profile:', error.message);
        throw error; 
      }
        this.profile = newProfileData;
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

