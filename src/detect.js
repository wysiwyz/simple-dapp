import detectEthereumProvider from "@metamask/detect-provider";

async function setup() {
    const provider = await detectEthereumProvider()

    if (provider && provider === window.ethereum) {
        console.log("可以使用 MetaMask!")
        startApp(provider)
    } else {
        console.log("請安裝 MetaMask!")
    }
}

// 需要安裝 chrome MetaMask extension
const chainId = await window.ethereum.request({ method: "eth_chainId" })

const ethereumButton = document.querySelector(".enableEthereumButton")
const showAccount = document.querySelector(".showAccount")

ethereumButton.addEventListener("click", () => { 
    getAccount()
})

async function getAccount() {
    const accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err) => {
            if (err.code === 4001) {
                console.log("請連線至 Metamask")
            } else {
                console.error(err)
            }
        })
const account = accounts[0]
showAccount.innerHTML = account
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