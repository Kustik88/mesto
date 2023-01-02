const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const popUpEdit = document.querySelector('#editProfile');
const popUpNewCard = document.querySelector('#addCard');
const popUpImage = document.querySelector('#image');
const closeBtnPopUpEdit = popUpEdit.querySelector('.popup__close-btn');
const closeBtnPopUpNewCard = popUpNewCard.querySelector('.popup__close-btn');
const closeBtnPopUpImage = popUpImage.querySelector('.popup__close-btn');
let formEditItem = popUpEdit.querySelector('.popup__form');
let formAddItem = popUpNewCard.querySelector('.popup__form');
let nameInput = formEditItem.querySelector('input[name=owner');
let jobInput = formEditItem.querySelector('input[name=job');
let titleInput = formAddItem.querySelector('input[name=title]');
let urlInput = formAddItem.querySelector('input[name=url]');
const nameProfile = document.querySelector('.profile__owner');
const jobProfile = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');

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
];

function activateLikeIcon(iconBtn) {
  iconBtn.classList.toggle('card__like-icon_active');
}

function deleteCard(card) {
  card.remove();
}

function createPopUpImage(caption, url) {
  popUpImage.querySelector('.popup__image').src = url;
  popUpImage.querySelector('.popup__image').alt = caption;
  popUpImage.querySelector('.popup__caption').textContent = caption;
}

function insertProfileValuestoPopUpEdit() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function loadPopUpTransition(popUpType) {
  if (!popUpType.classList.contains('popup_transition_load')) {
    popUpType.classList.add('popup_transition_load');
  };
}

function togglePopUp(popUpType) {
  popUpType.classList.toggle('popup_opened');
}

function getCard(elem) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const likeBtn = newCard.querySelector('.card__like-icon');
  const deleteBtn = newCard.querySelector('.card__delete-btn');

  newCard.querySelector('.card__image').style.backgroundImage = `url(${elem.link})`;
  newCard.querySelector('.card__heading').textContent = `${elem.name}`;

  likeBtn.addEventListener('click', () => { activateLikeIcon(likeBtn) });
  deleteBtn.addEventListener('click', () => { deleteCard(newCard) });
  newCard.querySelector('.card__image').addEventListener('click', () => {
    loadPopUpTransition(popUpImage),
      createPopUpImage(`${elem.name}`, `${elem.link}`),
      togglePopUp(popUpImage);
  });
  return newCard;
};

function insertCard(array) {
  array.forEach(item => {
    const newCard = getCard(item);
    if (array.length === 1) {
      cards.prepend(newCard);
    } else {
      cards.append(newCard);
    }
  });
}

function handleFormSubmitPopUpEdit() {
  const newName = nameInput.value;
  const newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  togglePopUp(popUpEdit)
}

function handleFormSubmitPopUpNewCard() {
  let newCard = [];
  const title = titleInput.value;
  const url = urlInput.value;
  newCard = [
    {
      name: title,
      link: url
    }
  ];
  togglePopUp(popUpNewCard);
  insertCard(newCard);
}

insertCard(initialCards);

formEditItem.addEventListener('submit', handleFormSubmitPopUpEdit);

editBtn.addEventListener('click', () => {
  loadPopUpTransition(popUpEdit),
    insertProfileValuestoPopUpEdit(),
    togglePopUp(popUpEdit)
});

formAddItem.addEventListener('submit', () => { handleFormSubmitPopUpNewCard() });

addBtn.addEventListener('click', () => {
  loadPopUpTransition(popUpNewCard),
    formAddItem.reset(),
    togglePopUp(popUpNewCard)
});

closeBtnPopUpEdit.addEventListener('click', () => { togglePopUp(popUpEdit) });
closeBtnPopUpNewCard.addEventListener('click', () => { togglePopUp(popUpNewCard) });
closeBtnPopUpImage.addEventListener('click', () => { togglePopUp(popUpImage) });


