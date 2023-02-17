import formValidator from "./formValidator.js"
import { Card, popUpImage } from "./card.js"
import { initialCards, validationSettings } from "./constants.js"

const btnEditProfile = document.querySelector('.profile__edit-btn')
const btnAddCard = document.querySelector('.profile__add-btn')
const popUpEdit = document.querySelector('.popup_type_profile-edit')
const popUpCardAdd = document.querySelector('.popup_type_add-card')
const formEdit = popUpEdit.querySelector('.popup__form')
const formAdd = popUpCardAdd.querySelector('.popup__form')
const nameInput = formEdit.querySelector('input[name=owner]')
const jobInput = formEdit.querySelector('input[name=job]')
const titleInput = formAdd.querySelector('input[name=title]')
const urlInput = formAdd.querySelector('input[name=url]')
const nameProfile = document.querySelector('.profile__owner')
const jobProfile = document.querySelector('.profile__job')
const cards = document.querySelector('.cards')
const formEditValidator = new formValidator(validationSettings, formEdit)
const formAddValidator = new formValidator(validationSettings, formAdd)


export function openPopUp(popUp) {
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
  document.removeEventListener('keyup', handleEscUp);
  popUp.classList.remove('popup_opened')
}

function checkCloseArea(evt) {
  return (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
}

function insertProfileValuesToPopUpEdit() {
  nameInput.value = nameProfile.textContent
  jobInput.value = jobProfile.textContent
}

function insertCard(card, isAppend = false) {
  const cardAdd = card.getCard()
  if (isAppend) {
    cards.append(cardAdd)
  } else {
    cards.prepend(cardAdd)
  }
}

function handleFormSubmitPopUpEdit() {
  nameProfile.textContent = nameInput.value
  jobProfile.textContent = jobInput.value
  closePopUp(popUpEdit)
}

function handleFormSubmitPopUpcardAdd() {
  const dataCard = {
    name: titleInput.value,
    link: urlInput.value
  }
  const cardAdd = new Card(dataCard, '#card')
  closePopUp(popUpCardAdd)
  insertCard(cardAdd)
}

initialCards.forEach(item => {
  const cardAdd = new Card(item, '#card')
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

formAdd.addEventListener('submit', handleFormSubmitPopUpcardAdd)

popUpEdit.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpEdit)
  }
})

popUpCardAdd.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpCardAdd)
  }
})

popUpImage.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpImage)
  }
})

formAddValidator.enableValidation()
formEditValidator.enableValidation()
