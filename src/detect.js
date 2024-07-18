import detectEthereumProvider from "@metamask/detect-provider";

const chainId = await window.ethereum.request({ method: "eth_chainId" })

async function setup() {
    const provider = await detectEthereumProvider()

    if (provider && provider === window.ethereum) {
        console.log("可以使用 MetaMask!")
        startApp(provider)
    } else {
        console.log("請安裝 MetaMask!")
    }
}
function handleChainChanged(chainId) {
    // 建議重刷頁面 reload page
    window.location.reload()
}
function startApp(provider) {
    if (provider !== window.ethereum) {
        console.error("你是不是安裝了多個錢包？")
    }
}

window.addEventListener("load", setup)
window.ethereum.on("chainChanged", handleChainChanged)