export default class Card {
  constructor(data, selectorTemplate, currentUserId, { handleCardClick, handleLikeClick, handleDeleteBtnClick }) {
    this.data = data
    this._name = data.name
    this._link = data.link
    this._likeList = data.likes
    this._nameOwnerCard = data.owner.name
    this._jobOwnerCard = data.owner.about
    this._avatarOwnerCard = data.owner.avatar
    this._currentUserId = currentUserId
    this._isOwner = data.owner._id === currentUserId
    this._isLiked = false
    this._selectorTemplate = selectorTemplate
    this._handleCardClick = handleCardClick
    this._handleLikeClick = handleLikeClick
    this._handleDeleteBtnClick = handleDeleteBtnClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true)

    return cardElement
  }

  getCard() {
    this._cardElement = this._getTemplate()
    this._infoOwner = this._cardElement.querySelector('.card__info-owner')
    this._avatarOwner = this._cardElement.querySelector('.card__avatar-owner')
    this._nameOwner = this._cardElement.querySelector('.card__name-owner')
    this._jobOwner = this._cardElement.querySelector('.card__job-owner')
    this._btnLike = this._cardElement.querySelector('.card__like-icon')
    this._btnAuthor = this._cardElement.querySelector('.card__show-owner-btn')
    this._checkLikeByUser()
    if (this._isOwner) {
      this._btnDelete = this._cardElement.querySelector('.card__delete-btn')
      this._btnDelete.classList.remove('card__delete-btn_invisible')
    }
    this._imageCard = this._cardElement.querySelector('.card__image')
    this._counterLike = this._cardElement.querySelector('.card__like-counter')
    this.countLikes(this._likeList.length)
    this._avatarOwner.src = this._avatarOwnerCard
    this._avatarOwner.alt = this._nameOwnerCard
    this._nameOwner.textContent = this._nameOwnerCard
    this._jobOwner.textContent = this._jobOwnerCard
    this._imageCard.src = this._link
    this._imageCard.alt = this._name
    this._cardElement.querySelector('.card__heading').textContent = this._name
    this._setEventListeners()
    return this._cardElement
  }

  _checkLikeByUser() {
    this._likeList.some(owner => {
      if (owner._id === this._currentUserId) {
        this.toggleLikeBtn()
      }
    })
  }

  _setEventListeners() {
    this._btnAuthor.addEventListener('click', () => {
      if(this._infoOwner.classList.contains('card__info-owner_visible')) {
        this._infoOwner.classList.remove('card__info-owner_visible')
      } else {
        this._infoOwner.classList.add('card__info-owner_visible')
      }

    })
    this._btnLike.addEventListener('click', () => {
      this._handleLikeClick(this._isLiked)
    })
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
    if (this._isOwner) {
      this._btnDelete.addEventListener('click', this._handleDeleteBtnClick)
    }
  }

  toggleLikeBtn() {
    this._isLiked = !this._isLiked
    this._btnLike.classList.toggle('card__like-icon_active')
  }

  deleteCard() {
    this._cardElement.remove()
    this._cardElement = null
  }

  countLikes(numberOfLikes) {
    this._counterLike.textContent = numberOfLikes
  }
}
