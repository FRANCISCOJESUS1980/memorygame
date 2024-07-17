import './main.scss'

const arrayCartas = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'pink' },
  { id: 5, color: 'black' },
  { id: 6, color: 'red' },
  { id: 7, color: 'orange' },
  { id: 8, color: 'blue' },
  { id: 9, color: 'pink' },
  { id: 10, color: 'black' }
]

let contador = 0
let carta1
let carta2
let puntuacion = 0
let parejasEncontradas = 0

const pedirNombreDeUsuario = () => {
  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.width = '100%'
  overlay.style.height = '100%'
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  overlay.style.display = 'flex'
  overlay.style.justifyContent = 'center'
  overlay.style.alignItems = 'center'
  overlay.style.zIndex = '1000'

  const inputContainer = document.createElement('div')
  inputContainer.style.backgroundColor = 'white'
  inputContainer.style.padding = '20px'
  inputContainer.style.borderRadius = '25px'
  inputContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
  inputContainer.style.textAlign = 'center'

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Introduce tu nombre de usuario'
  inputContainer.appendChild(input)

  const button = document.createElement('button')
  button.textContent = 'Enviar'
  button.addEventListener('click', () => {
    const usuario = input.value
    if (usuario) {
      localStorage.setItem('usuario', usuario)
      document.body.removeChild(overlay)
      iniciarJuego()
    } else {
      alert('Por favor, introduce un nombre de usuario válido.')
    }
  })
  inputContainer.appendChild(button)

  overlay.appendChild(inputContainer)
  document.body.appendChild(overlay)
}

const iniciarJuego = () => {
  const usuario = localStorage.getItem('usuario')

  arrayCartas.sort(() => Math.random() - Math.random())

  const divApp = document.querySelector('#app')

  const puntuacionHTML = document.createElement('h3')
  puntuacionHTML.textContent = `Puntuación: ${puntuacion}`
  document.body.append(puntuacionHTML, divApp)

  const mejorPuntuacionHTML = document.createElement('h4')
  const mejorPuntuacion = JSON.parse(
    localStorage.getItem('mejorPuntuacion')
  ) || { puntuacion: 0, usuario: '' }
  mejorPuntuacionHTML.textContent = `Mejor puntuación: ${mejorPuntuacion.puntuacion} por ${mejorPuntuacion.usuario}`
  document.body.append(mejorPuntuacionHTML)

  const mostrarMensajeFinal = () => {
    if (puntuacion > mejorPuntuacion.puntuacion) {
      localStorage.setItem(
        'mejorPuntuacion',
        JSON.stringify({ puntuacion, usuario })
      )
      mejorPuntuacionHTML.textContent = `Mejor puntuación: ${puntuacion} por ${usuario}`
    }

    const mensajeFinal = document.createElement('div')
    mensajeFinal.className = 'mensaje-final'

    const mensaje = document.createElement('h2')
    mensaje.textContent = `¡Juego terminado! Puntuación final: ${puntuacion}`

    const botonReiniciar = document.createElement('button')
    botonReiniciar.textContent = 'Empezar de nuevo'
    botonReiniciar.addEventListener('click', () => {
      window.location.reload()
    })

    mensajeFinal.append(mensaje, botonReiniciar)
    document.body.append(mensajeFinal)
  }

  const resetearValores = () => {
    contador = 0
    carta1 = undefined
    carta2 = undefined
    console.log(puntuacion)
  }

  const resetearCarta = (cartaGenerica) => {
    cartaGenerica.nodoHTML.style.backgroundColor = '#f5b6e4'
    cartaGenerica.nodoHTML.style.backgroundImage =
      'url(https://www.transparenttextures.com/patterns/crissxcross.png)'
    cartaGenerica.nodoHTML.classList.remove('disabled')
  }

  const comprobar = () => {
    if (carta1.datosCarta.color === carta2.datosCarta.color) {
      puntuacion++
      parejasEncontradas++
      resetearValores()

      if (parejasEncontradas === arrayCartas.length / 2) {
        mostrarMensajeFinal()
      }
    } else {
      puntuacion--
      setTimeout(() => {
        resetearCarta(carta1)
        resetearCarta(carta2)
        resetearValores()
      }, 1000)
    }
    puntuacionHTML.textContent = `Puntuación: ${puntuacion}`
  }

  const seleccionar = (divCartaNodoHTML, datosDeCadaCarta) => {
    if (contador < 2 && !divCartaNodoHTML.classList.contains('disabled')) {
      contador++
      console.log('Cartas seleccionadas: ' + contador)
      divCartaNodoHTML.style.backgroundColor = datosDeCadaCarta.color
      divCartaNodoHTML.style.backgroundImage = 'none'
      divCartaNodoHTML.classList.add('disabled')
    }

    if (contador === 1) {
      carta1 = {
        nodoHTML: divCartaNodoHTML,
        datosCarta: datosDeCadaCarta
      }

      console.log(carta1)
    }

    if (contador === 2) {
      carta2 = {
        nodoHTML: divCartaNodoHTML,
        datosCarta: datosDeCadaCarta
      }
      console.log(carta2)
      comprobar()
    }
  }

  arrayCartas.forEach((datosDeCadaCarta) => {
    const divCartaNodoHTML = document.createElement('div')
    divCartaNodoHTML.className = 'carta'

    divCartaNodoHTML.addEventListener('click', () =>
      seleccionar(divCartaNodoHTML, datosDeCadaCarta)
    )

    divApp.append(divCartaNodoHTML)
  })
}

if (!localStorage.getItem('usuario')) {
  pedirNombreDeUsuario()
} else {
  iniciarJuego()
}
