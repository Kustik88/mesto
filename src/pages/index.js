import './index.css'
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import {
  initialCards,
  validationSettings,
  btnEditProfile,
  btnAddCard,
  formEdit,
  formAdd,
  fieldInputOwner,
  fieldInputJob
} from "../utils/constants.js"

const userProfile = new UserInfo('.profile__owner', '.profile__job')
const formEditValidator = new FormValidator(validationSettings, formEdit)
const formAddValidator = new FormValidator(validationSettings, formAdd)

const cardList = new Section({
  items: initialCards,
  renderer: dataCard => {
    cardList.addItem(createCard(dataCard))
  }
}, '.cards')

const popupCardAdd = new PopupWithForm({
  handleFormSubmit: data => {
    cardList.addItem(createCard(data), true)
    popupCardAdd.close()
  }
}, '.popup_type_add-card')

const popupEdit = new PopupWithForm({
  handleFormSubmit: data => {
    userProfile.setUserInfo(data)
    popupEdit.close()
  }
}, '.popup_type_profile-edit')

const popupImage = new PopupWithImage('.popup_type_image')

const createCard = dataCard => {
  const card = new Card(dataCard, '#card', {
    handleCardClick: () => {
      popupImage.open(dataCard)
    }
  })
  const cardElement = card.getCard()
  return cardElement
}

btnEditProfile.addEventListener('click', () => {
  const dataProfile = userProfile.getUserInfo()
  fieldInputOwner.value = dataProfile.owner
  fieldInputJob.value = dataProfile.job
  formEditValidator.resetErrors()
  formEditValidator.enableSubmitButton()
  popupEdit.open()
})

btnAddCard.addEventListener('click', () => {
  formAddValidator.resetErrors()
  formAddValidator.disableSubmitButton()
  popupCardAdd.open()
})

popupEdit.setEventListeners()
popupCardAdd.setEventListeners()
popupImage.setEventListeners()

formAddValidator.enableValidation()
formEditValidator.enableValidation()
cardList.renderItems()
