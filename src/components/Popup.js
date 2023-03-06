export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup)
    this._handleEscUp = this._handleEscUp.bind(this)
  }

  _handleEscUp(evt) {
    evt.preventDefault()
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keyup', this._handleEscUp)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', this._handleEscUp)
  }

  setEventListeners() {

    this._popup.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close()
      }
    })
  }
}
