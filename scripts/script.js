const editBtn = document.querySelector('.profile__edit-btn');
const popUp = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-btn');
let likeIcons = document.querySelectorAll('.card__like-icon');
let formItem = popUp.querySelector('.popup__form');
let nameInput = formItem.querySelector('.popup__owner');
let jobInput = formItem.querySelector('.popup__job');
const nameProfile = document.querySelector('.profile__owner');
const jobProfile = document.querySelector('.profile__job');

function togglePopUp () {
    if (!popUp.classList.contains('.popup_opened')) {
        nameInput.value = nameProfile.textContent
        jobInput.value = jobProfile.textContent;
    }
    popUp.classList.toggle('popup_opened');
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
closeBtn.addEventListener('click', togglePopUp);

/*на следующий спринт, активация лайка
for (let i = 0; i < likeIcons.length; i++ ) {
    likeIcons[i].addEventListener('click', function() {
        likeIcons[i].classList.toggle('card__like-icon_active');
    });
}
*/
