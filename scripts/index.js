const btnEditProfile = document.querySelector('.profile__edit-btn');
const btnAddCard = document.querySelector('.profile__add-btn');
const popUpEdit = document.querySelector('.popup_type_profile-edit');
const popUpCardAdd = document.querySelector('.popup_type_add-card');
const popUpImage = document.querySelector('.popup_type_image');
const formEdit = popUpEdit.querySelector('.popup__form');
const formAdd = popUpCardAdd.querySelector('.popup__form');
const nameInput = formEdit.querySelector('input[name=owner]');
const jobInput = formEdit.querySelector('input[name=job]');
const btnSubmitFormEdit = formEdit.querySelector('.popup__submit-btn');
const btnSubmitFormAdd = formAdd.querySelector('.popup__submit-btn');
const titleInput = formAdd.querySelector('input[name=title]');
const urlInput = formAdd.querySelector('input[name=url]');
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
  const cardAdd = card.cloneNode(true);
  const btnLike = cardAdd.querySelector('.card__like-icon');
  const btnDelete = cardAdd.querySelector('.card__delete-btn');
  const imageCard = cardAdd.querySelector('.card__image');

  imageCard.src = elem.link;
  imageCard.alt = elem.name;
  cardAdd.querySelector('.card__heading').textContent = `${elem.name}`;

  btnLike.addEventListener('click', () => { clickbtnLike(btnLike) });
  btnDelete.addEventListener('click', () => { deleteCard(cardAdd) });
  imageCard.addEventListener('click', () => {
    fillPopUpImage(elem.name, elem.link);
    openPopUp(popUpImage);
  });
  return cardAdd;
}

function insertCard(card, isAppend = false) {
  const cardAdd = getCard(card);
  if (isAppend) {
    cards.append(cardAdd);
  } else {
    cards.prepend(cardAdd);
  }
}

function handleFormSubmitPopUpEdit() {
  const newName = nameInput.value;
  const newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  closePopUp(popUpEdit)
}

function handleFormSubmitPopUpcardAdd() {
  const title = titleInput.value;
  const url = urlInput.value;
  const cardAdd = {
    name: title,
    link: url
  };
  closePopUp(popUpCardAdd);
  insertCard(cardAdd);
}

initialCards.forEach(item => {
  insertCard(item, true);
})

btnEditProfile.addEventListener('click', () => {
  insertProfileValuesToPopUpEdit();
  hideInputError(formEdit, nameInput, validationSettings);
  hideInputError(formEdit, jobInput, validationSettings);
  enableSubmitBtn(btnSubmitFormEdit, validationSettings.inactiveButtonClass);
  openPopUp(popUpEdit)
})

btnAddCard.addEventListener('click', () => {
  formAdd.reset();
  hideInputError(formAdd, titleInput, validationSettings);
  hideInputError(formAdd, urlInput, validationSettings);
  disableSubmitBtn(btnSubmitFormAdd, validationSettings.inactiveButtonClass);
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
