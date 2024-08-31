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
      type: "error" as "error" | "success" | "info"
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
