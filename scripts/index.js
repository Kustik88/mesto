const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddCard = document.querySelector('.profile__add-btn');
const popUpEdit = document.querySelector('#editProfile');
const popUpNewCard = document.querySelector('#addCard');
const popUpImage = document.querySelector('#image');
const formEditItem = popUpEdit.querySelector('.popup__form');
const formAddItem = popUpNewCard.querySelector('.popup__form');
const nameInput = formEditItem.querySelector('input[name=owner]');
const jobInput = formEditItem.querySelector('input[name=job]');
const titleInput = formAddItem.querySelector('input[name=title]');
const urlInput = formAddItem.querySelector('input[name=url]');
const nameProfile = document.querySelector('.profile__owner');
const jobProfile = document.querySelector('.profile__job');
const imagePopUp = popUpImage.querySelector('.popup__image');
const captionPopUp = popUpImage.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const card = cardTemplate.querySelector('.card');


function openPopUp(popUp) {
  document.addEventListener('keyup', handleEscUp);
  popUp.classList.add('popup_opened');
}

function handleEscUp(evt) {
  evt.preventDefault();
  const popUpActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
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

function clickbtnLike(iconBtn) {
  iconBtn.classList.toggle('card__like-icon_active');
}

function deleteCard(card) {
  card.remove();
}

function fillPopUpImage(caption, url) {
  imagePopUp.src = url;
  imagePopUp.alt = caption;
  captionPopUp.textContent = caption;
}

function insertProfileValuesToPopUpEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function getCard(elem) {
  const newCard = card.cloneNode(true);
  const btnLike = newCard.querySelector('.card__like-icon');
  const btnDelete = newCard.querySelector('.card__delete-btn');
  const imageCard = newCard.querySelector('.card__image');

  imageCard.src = elem.link;
  imageCard.alt = elem.name;
  newCard.querySelector('.card__heading').textContent = `${elem.name}`;

  btnLike.addEventListener('click', () => { clickbtnLike(btnLike) });
  btnDelete.addEventListener('click', () => { deleteCard(newCard) });
  imageCard.addEventListener('click', () => {
    fillPopUpImage(elem.name, elem.link),
    openPopUp(popUpImage);
  });
  return newCard;
}

function insertCard(card, isAppend = false) {
  const newCard = getCard(card);
  if (isAppend) {
    cards.append(newCard);
  } else {
    cards.prepend(newCard);
  }
}

function handleFormSubmitPopUpEdit() {
  const newName = nameInput.value;
  const newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  closePopUp(popUpEdit)
}

function handleFormSubmitPopUpNewCard() {
  const title = titleInput.value;
  const url = urlInput.value;
  const newCard = {
    name: title,
    link: url
  };
  closePopUp(popUpNewCard);
  insertCard(newCard);
}

initialCards.forEach(item => {
  insertCard(item, true);
})

btnEditProfile.addEventListener('click', () => {
  insertProfileValuesToPopUpEdit();
  const formElements = defineFormElements(formEditItem, validationSettings.inputSelector, validationSettings.submitButtonSelector);
  formElements.inputList.forEach((inputElement) => {
    hideInputError(formEditItem, inputElement, validationSettings);
  });
  toggleButtonState(formElements.inputList, formElements.buttonElement, validationSettings.inactiveButtonClass);
  openPopUp(popUpEdit)
})

btnAddCard.addEventListener('click', () => {
  formAddItem.reset();
  const formElements = defineFormElements(formAddItem, validationSettings.inputSelector, validationSettings.submitButtonSelector);
  formElements.inputList.forEach((inputElement) => {
    hideInputError(formAddItem, inputElement, validationSettings);
  });
  toggleButtonState(formElements.inputList, formElements.buttonElement, validationSettings.inactiveButtonClass);
  openPopUp(popUpNewCard)
})

popUpEdit.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpEdit);
  };
})

popUpNewCard.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpNewCard);
  };
})

popUpImage.addEventListener('click', (evt) => {
  if (checkCloseArea(evt)) {
    closePopUp(popUpImage);
  };
})

formEditItem.addEventListener('submit', handleFormSubmitPopUpEdit);

formAddItem.addEventListener('submit', handleFormSubmitPopUpNewCard);
