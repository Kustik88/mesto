const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const popUp = document.querySelector('.popup');
const popUpEdit = document.querySelector('.popup_type_edit');
const popUpNewCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const closeBtn = document.querySelector('.popup__close-btn');
let likeIcons = document.querySelectorAll('.card__like-icon');
let formItem = popUp.querySelector('.popup__form');
let nameInput = formItem.querySelector('.popup__owner');
let jobInput = formItem.querySelector('.popup__job');
const nameProfile = document.querySelector('.profile__owner');
const jobProfile = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#card').content;
const card = document.querySelector('.cards');

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

initialCards.forEach(function(elem) {
  const newCardAdd = cardTemplate.querySelector('.card').cloneNode(true);
  newCardAdd.querySelector('.card__image').style.backgroundImage = `url(${elem.link})`;
  newCardAdd.querySelector('.card__heading').textContent = `${elem.name}`;
  card.append(newCardAdd);
});


function togglePopUp (object) {
  if (object.target.classList.contains('profile__add-btn')) {
    popUpNewCard.classList.toggle('popup_opened');
  } else if (object.target.classList.contains('profile__edit-btn')) {
        if (!popUpEdit.classList.contains('popup_opened')) {
          nameInput.value = nameProfile.textContent
          jobInput.value = jobProfile.textContent;
      }
      popUpEdit.classList.toggle('popup_opened');
  } else {
    popUpImage.classList.toggle('popup_opened');

  }


  console.log(object.target);
  console.log(addBtn);
  console.log(editBtn);
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    nameProfile.textContent = newName;
    jobProfile.textContent = newJob;
    togglePopUp();
}

formItem.addEventListener('submit', handleFormSubmit);
editBtn.addEventListener('click', togglePopUp);
addBtn.addEventListener('click', togglePopUp);
closeBtn.addEventListener('click', togglePopUp);

/*на следующий спринт, активация лайка
for (let i = 0; i < likeIcons.length; i++ ) {
    likeIcons[i].addEventListener('click', function() {
        likeIcons[i].classList.toggle('card__like-icon_active');
    });
}
*/
