import { defineStore } from 'pinia'

export const useAppStore = defineStore('App', {
  state: () => ({
    name: "",
    callback: null as (() => any) | null,
    toasts: [{
      actionCallback: null as (() => void) | null,
      actionText: "",
      title: "",
      open: false,
      message: "" as string | [string, { [key: string]: string | number }],
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
