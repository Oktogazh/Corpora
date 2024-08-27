import { defineStore } from 'pinia';
import { auth } from '@/firebase';
import { onAuthStateChanged, type User } from "firebase/auth";

interface ExtendedUser extends User {
  // Somehow not in the User type, but actual user has no metadata.creationTime
  createdAt: string;
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
