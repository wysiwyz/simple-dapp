import { useSyncExternalStore } from "react"
import { store } from "./store"

export const useSyncProviders = () =>
  useSyncExternalStore(store.subscribe, store.value, store.value)
// store.subscribe : 監聽外部 store 的變更
// store.value function : 取得 store 當下的 value
// store.value : 給 store 的初始值 