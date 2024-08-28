import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', {
  state: () => ({
    name: "",
    toast: {
      title: "",
      open: false,
      message: "",
      type: "error"
    }
  }),
  actions: {
    setName(appName: string) {
      this.name = appName
    }
  }
})
