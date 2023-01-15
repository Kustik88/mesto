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

function openPopUp (popUp) {
  popUp.classList.add('popup_opened');
}

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
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

function resetInputError(popUp) {
  const errorInputlist = Array.from(popUp.querySelectorAll('.popup__input'));
  const errorList = Array.from(popUp.querySelectorAll('.popup__input-error'));
  errorInputlist.forEach((errorInputElement) => {
    errorInputElement.classList.remove('popup__input_type_error');
  });
  errorList.forEach((errorElement) => {
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
  });
};

function checkPopUpArea(evt) {
  return (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn') )
}

initialCards.forEach(item => {
  insertCard(item, true);
})

enableValidation(validationClasses);

formEditItem.addEventListener('submit', handleFormSubmitPopUpEdit);

editBtn.addEventListener('click', () => {
  insertProfileValuesToPopUpEdit(),
  openPopUp(popUpEdit)
});

formAddItem.addEventListener('submit', handleFormSubmitPopUpNewCard);

addBtn.addEventListener('click', () => {
  formAddItem.reset(),
  openPopUp(popUpNewCard)
});

popUpEdit.addEventListener('click', (evt) => {
  if (checkPopUpArea(evt)) {
    closePopUp(popUpEdit), resetInputError(popUpEdit)
  };
});

popUpNewCard.addEventListener('click', (evt) => {
  if (checkPopUpArea(evt)) {
    closePopUp(popUpNewCard), resetInputError(popUpNewCard)
  };
});

popUpImage.addEventListener('click', (evt) => {
  if (checkPopUpArea(evt)) {
    closePopUp(popUpImage)
  };
});
