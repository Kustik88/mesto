import formValidator from "./formValidator.js";
import { Card, popUpImage } from "./card.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}


const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddCard = document.querySelector('.profile__add-btn');
const popUpEdit = document.querySelector('.popup_type_profile-edit');
const popUpCardAdd = document.querySelector('.popup_type_add-card');
//const popUpImage = document.querySelector('.popup_type_image');
const formEdit = popUpEdit.querySelector('.popup__form')
const formAdd = popUpCardAdd.querySelector('.popup__form')
const nameInput = formEdit.querySelector('input[name=owner]');
const jobInput = formEdit.querySelector('input[name=job]');
const titleInput = formAdd.querySelector('input[name=title]');
const urlInput = formAdd.querySelector('input[name=url]');
const nameProfile = document.querySelector('.profile__owner');
const jobProfile = document.querySelector('.profile__job');
const imagePopUp = popUpImage.querySelector('.popup__image')
const captionPopUp = popUpImage.querySelector('.popup__caption')
const cards = document.querySelector('.cards');
const formEditValidator = new formValidator(validationSettings, popUpEdit.querySelector('.popup__form'))
const formAddValidator = new formValidator(validationSettings, popUpCardAdd.querySelector('.popup__form'))


export function openPopUp(popUp) {
  document.addEventListener('keyup', handleEscUp);
  popUp.classList.add('popup_opened');
}

function handleEscUp(evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    const popUpActive = document.querySelector('.popup_opened');
    closePopUp(popUpActive);
  }
}

function closePopUp(popUp) {
  document.removeEventListener('keyup', handleEscUp);
  popUp.classList.remove('popup_opened');
}

function checkCloseArea(evt) {
  return (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
}

function insertProfileValuesToPopUpEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function insertCard(card, isAppend = false) {
  const cardAdd = card.getCard();
  if (isAppend) {
    cards.append(cardAdd);
  } else {
    cards.prepend(cardAdd);
  }
}

function handleFormSubmitPopUpEdit() {
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopUp(popUpEdit)
}

function handleFormSubmitPopUpcardAdd() {
  const dataCard = {
    name: titleInput.value,
    link: urlInput.value
  };
  const cardAdd = new Card(dataCard, '#card')
  closePopUp(popUpCardAdd);
  insertCard(cardAdd);
}

initialCards.forEach(item => {
  const cardAdd = new Card(item, '#card')
  insertCard(cardAdd, true);
})

btnEditProfile.addEventListener('click', () => {
  insertProfileValuesToPopUpEdit();
  openPopUp(popUpEdit)
})

btnAddCard.addEventListener('click', () => {
  formAdd.reset();
  openPopUp(popUpCardAdd)
})

formEdit.addEventListener('submit', handleFormSubmitPopUpEdit);

formAdd.addEventListener('submit', handleFormSubmitPopUpcardAdd);

popUpEdit.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpEdit);
  };
})

popUpCardAdd.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpCardAdd);
  };
})

popUpImage.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpImage);
  };
})

formAddValidator.enableValidation()
formEditValidator.enableValidation()
