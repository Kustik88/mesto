export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  _handleEscUp(evt) {
    evt.preventDefault()
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  open() {
    this._popup.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keyup', evt => this._handleEscUp(evt))
    this._popup.classList.remove('popup_opened')
  }

  setEventListeners() {
    document.addEventListener('keyup', evt => this._handleEscUp(evt))
    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close()
      }
    })
  }
}
