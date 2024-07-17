export const pedirNombreDeUsuario = (callback) => {
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
      callback()
    } else {
      alert('Por favor, introduce un nombre de usuario válido.')
    }
  })
  inputContainer.appendChild(button)

  overlay.appendChild(inputContainer)
  document.body.appendChild(overlay)
}

export const iniciarJuego = () => {
  location.reload()
}
