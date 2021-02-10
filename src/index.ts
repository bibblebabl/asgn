import './style.css'

import { App } from './app'

document.getElementById('app').innerHTML = `
  <header class="header">
  <h1 class="heading">Drawer</h1>
  <button class="reset" type="button">reset</button>
  </header>
`

new App()
