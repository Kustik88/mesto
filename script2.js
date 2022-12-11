const editBtn = document.querySelector('.profile__edit-btn');
const popUp = document.querySelector('.popup');
const closeIcon = popUp.querySelector('.popup__close-icon');
let likeIcons = document.querySelectorAll('.card__like-icon');

function showClosePopUp () {
    popUp.classList.toggle('popup_opened');
}

function likeIconActivate () {
    like.classList.toggle('card__like-icon_active');
}

for (let i = 0; i < likeIcons.length; i++ ) {
    likeIcons[i].addEventListener('click', () => {
        likeIcons[i].classList.toggle('card__like-icon_active');
    });
}


editBtn.addEventListener('click', showClosePopUp);
closeIcon.addEventListener('click', showClosePopUp);
