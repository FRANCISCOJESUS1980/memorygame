import './main.scss'
import {
  pedirNombreDeUsuario,
  iniciarJuego
} from './public/assets/componentes/utils.js'
import { setupGame } from './public/assets/componentes/game.js'

if (!localStorage.getItem('usuario')) {
  pedirNombreDeUsuario(iniciarJuego)
} else {
  setupGame()
}
