import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged, type User } from "firebase/auth";

export const useUserStore = defineStore('User', {
  state: () => ({
    user: null as User | null,
    isConnected: false,
  }),
  actions: {
    logout() {
      auth.signOut();
    },
    initAuth() {
      const state = this;
      onAuthStateChanged(auth, (user) => {
        console.log('onAuthStateChanged', user);
        state.user = user;
        state.isConnected = user !== null;
      });
    },
  }
})
