const editBtn = document.querySelector('.profile__edit-btn');
const popUp = document.querySelector('.popup');
const closeIcon = popUp.querySelector('.popup__close-icon');
let likeIcons = document.querySelectorAll('.card__like-icon');

function showClosePopUp () {
    popUp.classList.toggle('popup_opened');
}

for (let i = 0; i < likeIcons.length; i++ ) {
    likeIcons[i].addEventListener('click', function() {
        likeIcons[i].classList.toggle('card__like-icon_active');
    });
}



editBtn.addEventListener('click', showClosePopUp);
closeIcon.addEventListener('click', showClosePopUp);


let formItem = document.querySelector('.popup__form');
let nameInput = formItem.querySelector('.popup__owner');
let jobInput = formItem.querySelector('.popup__job');

function handleFormSubmit (evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJob = jobInput.value;
    const nameProfile = document.querySelector('.profile__owner');
    const jobProfile = document.querySelector('.profile__owner-job');
    nameProfile.textContent = newName;
    jobProfile.textContent = newJob;
    showClosePopUp();

}



formItem.addEventListener('submit', handleFormSubmit);