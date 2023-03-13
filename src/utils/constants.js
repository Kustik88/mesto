export const validationSettings = {
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  selectorSubmitButton: '.popup__submit-btn',
  classInactiveButton: 'popup__submit-btn_inactive',
  classInputError: 'popup__input_type_error',
  classError: 'popup__input-error_visible'
}

export const btnEditProfile = document.querySelector('.profile__edit-btn')
export const btnAddCard = document.querySelector('.profile__add-btn')
const popUpEdit = document.querySelector('.popup_type_profile-edit')
const popUpCardAdd = document.querySelector('.popup_type_add-card')
export const formEdit = popUpEdit.querySelector('.popup__form')
export const formAdd = popUpCardAdd.querySelector('.popup__form')
