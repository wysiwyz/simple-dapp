// Extends WindowEventMap interface, including a custom event eip6963:announceProvider.
declare global {
    interface WindowEventMap {
      "eip6963:announceProvider": CustomEvent
    }
  }
  
  // Array that stores detected wallet providers and their details. 
  let providers: EIP6963ProviderDetail[] = []
  
  // Object containing two methods. The store holds the state of detected Ethereum wallet providers.
  // It's implemented as an external store, making it available for subscription and synchronization
  // across the dapp.
  export const store = {
    // Returns the current state of providers.
    value: () => providers,

    // Subscribes to provider announcements and updates the store accordingly.
    // Takes a callback function to be invoked on each store update, returning a function to
    // unsubscribe from the event.
    subscribe: (callback: () => void) => {
      function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
        // 如果新提供者的uuid已經存在於prociders陣列中，就忽略event
        if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid))
          return
        providers = [...providers, event.detail]
        callback()
      }
      // 將 onAnnouncement function 註冊為 eip6963:announceProvider 事件的處理器
      window.addEventListener("eip6963:announceProvider", onAnnouncement)

      // 觸發事件 請求當前存在的錢包提供者
      window.dispatchEvent(new Event("eip6963:requestProvider"))
  
      // 傳回函數 用於取消訂閱 eip6963:announceProvider 事件
      return () =>
        window.removeEventListener("eip6963:announceProvider", onAnnouncement)
    },
  }