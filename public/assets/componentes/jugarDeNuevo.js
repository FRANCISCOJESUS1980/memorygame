const playAgainBtn = document.getElementById('play-again')

if (playAgainBtn) {
  playAgainBtn.addEventListener('click', () => {
    window.location.reload()
  })
}
