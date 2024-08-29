import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', {
  state: () => ({
    name: "",
    toasts: [{
      actionCallback: null as (() => void) | null,
      actionText: "",
      title: "",
      open: false,
      message: "",
      type: "error"
    }],
    sidebar: {
      open: false
    }
  }),
  actions: {
    setName(appName: string) {
      this.name = appName
    }
  }
})
