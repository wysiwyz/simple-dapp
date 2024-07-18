import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `<button class="enableEthereumButton">Enable Ethereum</button><h2>Account: <span class="showAccount"></span></h2>`

setupCounter(document.querySelector('#counter'))
