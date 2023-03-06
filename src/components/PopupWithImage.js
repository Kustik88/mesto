import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._image = this._popup.querySelector('.popup__image')
    this._caption = this._popup.querySelector('.popup__caption')
  }

  open(dataCard) {
    this._image.src = dataCard.link
    this._image.alt = dataCard.name
    this._caption.textContent = dataCard.name
    super.open()
  }
}
