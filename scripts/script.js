const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const closeBtnpopUpEdit = popUpEdit.querySelector('.popup__close-btn');
const closeBtnpopUpNewCard = popUpNewCard.querySelector('.popup__close-btn');
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

function getCard (elem) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const likeBtn = newCard.querySelector('.card__like-icon');
  const deleteBtn = newCard.querySelector('.card__delete-btn');

  newCard.querySelector('.card__image').style.backgroundImage = `url(${elem.link})`;
  newCard.querySelector('.card__heading').textContent = `${elem.name}`;

  likeBtn.addEventListener('click', () => activateLikeIcon(likeBtn));
  deleteBtn.addEventListener('click', () => {deleteCard(newCard)});
  newCard.querySelector('.card__image').addEventListener('click', () => {createPopUpImage(`${elem.name}`, `${elem.link}`)});
  return newCard;
};


function activateLikeIcon (iconBtn) {
  iconBtn.classList.toggle('card__like-icon_active');
}

function deleteCard (card) {
  card.remove();
}

function insertCard(array) {
  array.forEach(item => {
    const newCard = getCard(item);
    cards.prepend(newCard);
  });
}

function createPopUpImage (caption, url) {
  popUpImage.querySelector('.popup__image').src = url;
  popUpImage.querySelector('.popup__image').alt = caption;
  popUpImage.querySelector('.popup__caption').textContent = caption;
  togglePopUp(popUpImage);
}

function togglePopUp (popUpType) {
  /*проверяем, если вызывается попап редактирования профиля, то подставляем актуальные значения в поля ввода*/
    if (popUpType.classList.contains('popup_type_edit') && (!popUpEdit.classList.contains('popup_opened'))) {
      nameInput.value = nameProfile.textContent;
      jobInput.value = jobProfile.textContent;
    }
  popUpType.classList.toggle('popup_opened');
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    nameProfile.textContent = newName;
    jobProfile.textContent = newJob;
    togglePopUp(popUpEdit);
}

function getNewCard () {

  const title = titleInput.value;
  const url = urlInput.value;
  const newCard = [
    {
      name: title,
      link: url
    }
  ];
  togglePopUp(popUpNewCard);
  return newCard;
}

insertCard(initialCards);

formEditItem.addEventListener('submit', handleFormSubmit);
/*formAddItem.addEventListener('submit', getNewCard);*/
editBtn.addEventListener('click', () => {togglePopUp(popUpEdit)});
addBtn.addEventListener('click', () => {
  togglePopUp(popUpNewCard);
  formAddItem.addEventListener('submit', () => {
    const newCard = getNewCard();
    insertCard(newCard);
  });
});
closeBtnpopUpEdit.addEventListener('click', () => togglePopUp(popUpEdit));
closeBtnpopUpNewCard.addEventListener('click', () => togglePopUp(popUpNewCard));
closeBtnPopUpImage.addEventListener('click', () => togglePopUp(popUpImage));


