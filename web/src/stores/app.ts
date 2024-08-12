import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', {
  state: () => ({
    name: "",
  }),
  actions: {
    setName(appName: string) {
      this.name = appName
    }
  }
})
