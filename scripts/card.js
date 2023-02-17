import { openPopUp } from "./index.js";

const popUpImage = document.querySelector('.popup_type_image');
const imagePopUp = popUpImage.querySelector('.popup__image')
const captionPopUp = popUpImage.querySelector('.popup__caption')

class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)

    return cardElement
  }

  getCard() {
    this._cardElement = this._getTemplate()
    this._btnLike = this._cardElement.querySelector('.card__like-icon')
    this._btnDelete = this._cardElement.querySelector('.card__delete-btn')
    this._imageCard = this._cardElement.querySelector('.card__image')
    this._imageCard.src = this._link
    this._imageCard.alt = this._name
    this._cardElement.querySelector('.card__heading').textContent = `${this._name}`;
    this._setEventListeners()
    return this._cardElement
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', this._clickBtnLike)
    this._btnDelete.addEventListener('click', this._deleteCard)
    this._imageCard.addEventListener('click', () => {
      this._fillPopUpImage()
      openPopUp(popUpImage)
    })
  }

  _clickBtnLike() {
    this.classList.toggle('card__like-icon_active')
  }

  _deleteCard() {
    this.closest('.card').remove()
  }

  _fillPopUpImage() {
    imagePopUp.src = this._link
    imagePopUp.alt = this._name
    captionPopUp.textContent = this._name
  }
}

export { popUpImage, Card }
