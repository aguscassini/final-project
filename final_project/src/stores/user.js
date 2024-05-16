
import {ref} from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase';
import router from '@/router';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),



  
  actions: {
    async fetchUser () {
      const user = await supabase.auth.getUser();
      this.user = user.data.user;
    },
    async signUp (email, password) {
      const { data, error } = await supabase.auth.signUp ({
        email: email,
        password: password
      });
      if (error) throw error;
      if (data) this.user = data.user;
    },
    async signIn(email, password){
      const {data,error} = await supabase.auth.signInWithPassword ({
        email:email,
        password:password
      });
      if (error) throw error
      this.user = data.user;
    },

    async logOut(){
      const {error} = await supabase.auth.signOut();
      if (error) {
      console.error('Error during logout:', error.message);
      } else{
        this.user = null;
        router.push ('/auth');
      }
      
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
    },
 }
);
