const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
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
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const card = cardTemplate.querySelector('.card');


function openPopUp(popUp) {
  setEventListenersClosePopUp(popUp);
  popUp.classList.add('popup_opened');
}

function handleEscUp(evt) {
  evt.preventDefault();
  const activePopUp = defineOpenedPopUp();
  if (evt.key === 'Escape') {
    closePopUp(activePopUp);
  }
}

function defineOpenedPopUp() {
  const activePopUp = document.querySelector('.popup_opened');
  return activePopUp;
}

function closePopUp(popUp) {
  if (popUp.id === 'editProfile') {
    popUp.removeEventListener('submit', handleFormSubmitPopUpEdit);
    resetInputError(popUp);
  } else if (popUp.id === 'addCard') {
    popUp.removeEventListener('submit', handleFormSubmitPopUpNewCard);
    resetInputError(popUp);
  }
  document.removeEventListener('keyup', handleEscUp);
  popUp.classList.remove('popup_opened');
}

function resetInputError(popUp) {
  const inputlist = Array.from(popUp.querySelectorAll(validationSettings.inputSelector));
  const errorList = Array.from(popUp.querySelectorAll('.popup__input-error'));
  inputlist.forEach((inputElement, index) => {
    if (inputElement.classList.contains(validationSettings.inputErrorClass)) {
      inputElement.classList.remove(validationSettings.inputErrorClass);
      errorList[index].classList.remove(validationSettings.errorClass);
    }
  })
}

function checkCloseArea(evt) {
  return (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn'))
}

function setEventListenersClosePopUp(popUp) {
  document.addEventListener('keyup', handleEscUp);
  popUp.addEventListener('click', (evt) => {
    if (checkCloseArea(evt)) {
      closePopUp(popUp);
    };
  })
}

function clickLikeBtn(iconBtn) {
  iconBtn.classList.toggle('card__like-icon_active');
}

function deleteCard(card) {
  card.remove();
}

function fillPopUpImage(caption, url) {
  popUpImage.querySelector('.popup__image').src = url;
  popUpImage.querySelector('.popup__image').alt = caption;
  popUpImage.querySelector('.popup__caption').textContent = caption;
}

function insertProfileValuesToPopUpEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function getCard(elem) {
  const newCard = card.cloneNode(true);
  const likeBtn = newCard.querySelector('.card__like-icon');
  const deleteBtn = newCard.querySelector('.card__delete-btn');
  const imageCard = newCard.querySelector('.card__image');

  imageCard.src = elem.link;
  imageCard.alt = elem.name;
  newCard.querySelector('.card__heading').textContent = `${elem.name}`;

  likeBtn.addEventListener('click', () => { clickLikeBtn(likeBtn) });
  deleteBtn.addEventListener('click', () => { deleteCard(newCard) });
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

enableValidation(validationSettings);

editBtn.addEventListener('click', () => {
  formEditItem.addEventListener('submit', handleFormSubmitPopUpEdit);
  insertProfileValuesToPopUpEdit();
  const formElements = defineFormElements(popUpEdit, validationSettings.inputSelector, validationSettings.submitButtonSelector);
  toggleButtonState(formElements.inputList, formElements.buttonElement, validationSettings.inactiveButtonClass);
  openPopUp(popUpEdit)
})

addBtn.addEventListener('click', () => {
  formAddItem.addEventListener('submit', handleFormSubmitPopUpNewCard);
  formAddItem.reset();
  const formElements = defineFormElements(popUpNewCard, validationSettings.inputSelector, validationSettings.submitButtonSelector);
  toggleButtonState(formElements.inputList, formElements.buttonElement, validationSettings.inactiveButtonClass);
  openPopUp(popUpNewCard)
})
