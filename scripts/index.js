import FormValidator from "./formValidator.js"
import Card from "./card.js"
import { initialCards, validationSettings } from "./constants.js"

const popups = document.querySelectorAll('.popup')
const btnEditProfile = document.querySelector('.profile__edit-btn')
const btnAddCard = document.querySelector('.profile__add-btn')
const popUpEdit = document.querySelector('.popup_type_profile-edit')
const popUpCardAdd = document.querySelector('.popup_type_add-card')
const formEdit = popUpEdit.querySelector('.popup__form')
const formAdd = popUpCardAdd.querySelector('.popup__form')
const popUpImage = document.querySelector('.popup_type_image')
const imagePopUp = popUpImage.querySelector('.popup__image')
const captionPopUp = popUpImage.querySelector('.popup__caption')
const nameInput = formEdit.querySelector('input[name=owner]')
const jobInput = formEdit.querySelector('input[name=job]')
const titleInput = formAdd.querySelector('input[name=title]')
const urlInput = formAdd.querySelector('input[name=url]')
const nameProfile = document.querySelector('.profile__owner')
const jobProfile = document.querySelector('.profile__job')
const cards = document.querySelector('.cards')
const formEditValidator = new FormValidator(validationSettings, formEdit)
const formAddValidator = new FormValidator(validationSettings, formAdd)

function openPopUp(popUp) {
  document.addEventListener('keyup', handleEscUp)
  popUp.classList.add('popup_opened')
}

function handleEscUp(evt) {
  evt.preventDefault()
  if (evt.key === 'Escape') {
    const popUpActive = document.querySelector('.popup_opened')
    closePopUp(popUpActive)
  }
}

function closePopUp(popUp) {
  document.removeEventListener('keyup', handleEscUp)
  popUp.classList.remove('popup_opened')
}

function checkCloseArea(evt) {
  return (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
}

function insertProfileValuesToPopUpEdit() {
  nameInput.value = nameProfile.textContent
  jobInput.value = jobProfile.textContent
}

function handleCardClick(name, link) {
  imagePopUp.alt = name
  imagePopUp.src = link
  captionPopUp.textContent = name
  openPopUp(popUpImage)
}

function createCard(dataCard) {
  const card = new Card(dataCard, '#card', handleCardClick)
  const cardElement = card.getCard()
  return cardElement
}

function insertCard(card, isAppend = false) {
  if (isAppend) {
    cards.append(card)
  } else {
    cards.prepend(card)
  }
}

function handleFormSubmitPopUpEdit() {
  nameProfile.textContent = nameInput.value
  jobProfile.textContent = jobInput.value
  closePopUp(popUpEdit)
}

function handleFormSubmitPopUpCardAdd() {
  const dataCard = {
    name: titleInput.value,
    link: urlInput.value
  }
  const cardAdd = createCard(dataCard)
  closePopUp(popUpCardAdd)
  insertCard(cardAdd)
}

initialCards.forEach(dataCard => {
  const cardAdd = createCard(dataCard)
  insertCard(cardAdd, true)
})

btnEditProfile.addEventListener('click', () => {
  insertProfileValuesToPopUpEdit()
  formEditValidator.resetErrors()
  formEditValidator.enableSubmitButton()
  openPopUp(popUpEdit)
})

btnAddCard.addEventListener('click', () => {
  formAdd.reset()
  formAddValidator.resetErrors()
  formAddValidator.disableSubmitButton()
  openPopUp(popUpCardAdd)
})

formEdit.addEventListener('submit', handleFormSubmitPopUpEdit)

formAdd.addEventListener('submit', handleFormSubmitPopUpCardAdd)

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (checkCloseArea(evt)) {
      closePopUp(popup)
    }
  })
})

formAddValidator.enableValidation()
formEditValidator.enableValidation()
