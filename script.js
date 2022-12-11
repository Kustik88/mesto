let editBtn = document.querySelector('.profile__edit-btn');
let likeIcons = document.querySelectorAll('.card__like-icon');
let popup = document.querySelector('.popup');
let closeIcon = popup.querySelector('.popup__close-icon');


function showClosePopup () {
    popup.classList.toggle('popup_opened');
}

function clickLikeIcon () {
    for (let i = 0; i < likeIcons.length; i++) {
        likeIcons[i].addEventListener("click", likeIconActive(i)) 
    }
}

function likeIconActive (i) {
    likeIcons[i].classList.toggle('card__like-icon_active');
}

editBtn.addEventListener('click', showClosePopup);
closeIcon.addEventListener('click', showClosePopup);
likeIcons.addEventListener('click', clickLikeIcon);