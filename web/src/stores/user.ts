import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged, type User } from "firebase/auth";

interface ExtendedUser extends User {
  createdAt: string; // Add your custom property here
}

export const useUserStore = defineStore('User', {
  state: () => ({
    user: null as ExtendedUser | null,
    isConnected: false,
  }),
  actions: {
    logout() {
      auth.signOut();
    },
    initAuth() {
      const state = this;
      onAuthStateChanged(auth, (user) => {
        state.user = JSON.parse(JSON.stringify(user));
        state.isConnected = user !== null;
      });
    },
  }
})
