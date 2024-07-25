const backToMenuBtn = document.createElement('button')
backToMenuBtn.id = 'backToMenuBtn'
backToMenuBtn.textContent = 'Volver al menú principal'
document.body.appendChild(backToMenuBtn)

backToMenuBtn.addEventListener('click', () => {
  window.location.href = 'https://proyecto5-1.vercel.app'
})
