export default class Card {
  constructor(data, templateSelector, { handleCardClick }) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
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
    this._cardElement.querySelector('.card__heading').textContent = this._name
    this._setEventListeners()
    return this._cardElement
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', this._clickBtnLike)
    this._btnDelete.addEventListener('click', this._deleteCard)
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  _clickBtnLike() {
    this.classList.toggle('card__like-icon_active')
  }

  _deleteCard() {
    this.closest('.card').remove()
  }
}
