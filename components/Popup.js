export default class Popup{
  consnructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    document.addEventListener('keyup', _handleEscUp)
    this._popup.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keyup', _handleEscUp)
    this._popup.classList.remove('popup_opened')
  }

  _handleEscUp(evt) {
    evt.preventDefault()
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close()
      }
    })
  }
}
