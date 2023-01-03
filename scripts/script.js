const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const popUpEdit = document.querySelector('#editProfile');
const popUpNewCard = document.querySelector('#addCard');
const popUpImage = document.querySelector('#image');
const closeBtnPopUpEdit = popUpEdit.querySelector('.popup__close-btn');
const closeBtnPopUpNewCard = popUpNewCard.querySelector('.popup__close-btn');
const closeBtnPopUpImage = popUpImage.querySelector('.popup__close-btn');
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

function insertProfileValuestoPopUpEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openPopUp (popUpType) {
  popUpType.classList.add('popup_opened');
}

function closePopUp(popUpType) {
  popUpType.classList.remove('popup_opened');
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

formEditItem.addEventListener('submit', handleFormSubmitPopUpEdit);

editBtn.addEventListener('click', () => {
  insertProfileValuestoPopUpEdit(),
  openPopUp(popUpEdit)
});

formAddItem.addEventListener('submit', handleFormSubmitPopUpNewCard);

addBtn.addEventListener('click', () => {
  formAddItem.reset(),
  openPopUp(popUpNewCard)
});

closeBtnPopUpEdit.addEventListener('click', () => { closePopUp(popUpEdit) });
closeBtnPopUpNewCard.addEventListener('click', () => { closePopUp(popUpNewCard) });
closeBtnPopUpImage.addEventListener('click', () => { closePopUp(popUpImage) });
