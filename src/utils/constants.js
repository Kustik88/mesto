export const validationSettings = {
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  selectorSubmitButton: '.popup__submit-btn',
  classInactiveButton: 'popup__submit-btn_inactive',
  classInputError: 'popup__input_type_error',
  classError: 'popup__input-error_visible'
}
export const btnEditAvatarProfile = document.querySelector('.profile__edit-avatar-btn')
export const btnEditProfile = document.querySelector('.profile__edit-btn')
export const btnAddCard = document.querySelector('.profile__add-btn')
const popUpEdit = document.querySelector('.popup_type_profile-edit')
const popUpCardAdd = document.querySelector('.popup_type_add-card')
const popupAvatarProfileEdit = document.querySelector('.popup_type_avatar-edit')
export const formEditProfile = popUpEdit.querySelector('.popup__form')
export const formAddCard = popUpCardAdd.querySelector('.popup__form')
export const formEditAvatarProfile = popupAvatarProfileEdit.querySelector('.popup__form')
const filterLikes = document.querySelector('.filters__filter')
export const btnSortLikesDescending = filterLikes.querySelector('.filters__dropdown-btn_type_descending')
export const btnSortLikesAscending = filterLikes.querySelector('.filters__dropdown-btn_type_ascending')

