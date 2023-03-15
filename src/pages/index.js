import './index.css'
import Api from '../components/Api.js'
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import {
  validationSettings,
  btnEditAvatarProfile,
  btnEditProfile,
  btnAddCard,
  formEditProfile,
  formAddCard,
  formEditAvatarProfile
} from "../utils/constants.js"

let currentUserId

const api = new Api(
  'https://nomoreparties.co/v1/cohort-61',
  '691fb0ad-da89-4356-9015-af40e9b402a2'
)

const userProfile = new UserInfo('.profile__owner', '.profile__job', '.profile__avatar')
const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile)
const formAddCardValidator = new FormValidator(validationSettings, formAddCard)
const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatarProfile)

const cardList = new Section({
  renderer: dataCard => cardList.addItem(createCard(dataCard))
}, '.cards')

const popupCardAdd = new PopupWithForm({
  handleFormSubmit: data => {
    popupCardAdd.editBtnText('Сохранение...')
    api.addCard(data)
      .then(res => cardList.addItem(createCard(res), true))
      .catch(err => displayError(err))
      .finally(() => popupCardAdd.close())
  }
}, '.popup_type_add-card')

const popupCardDelete = new PopupWithConfirmation({
  handleFormSubmit: () => popupCardDelete.executeSubmit()
}, '.popup_type_delete-card')

const popupEdit = new PopupWithForm({
  handleFormSubmit: data => {
    popupEdit.editBtnText('Сохранение...')
    api.editUserInfo(data)
      .then(res => {
        userProfile.setUserInfo({
          name: res.name,
          about: res.about
        })
      })
      .catch(err => displayError(err))
      .finally(() => popupEdit.close())
  }
}, '.popup_type_profile-edit')

const popupAvatarEdit = new PopupWithForm({
  handleFormSubmit: data => {
    popupAvatarEdit.editBtnText('Сохранение...')
    api.editAvatarProfile(data.avatar)
      .then(res => userProfile.setUserAvatar(res))
      .catch(err => displayError(err))
      .finally(() => popupAvatarEdit.close())
  }
}, '.popup_type_avatar-edit')

const popupImage = new PopupWithImage('.popup_type_image')

const createCard = dataCard => {
  const card = new Card(dataCard, '#card', currentUserId, {
    handleCardClick: () => popupImage.open(dataCard),
    handleLikeClick: isLiked => {
      (isLiked
        ? api.unlikeCard(dataCard._id)
        : api.likeCard(dataCard._id))
        .then(res => card.countLikes(res.likes.length))
        .then(() => card.toggleLikeBtn())
        .catch(err => displayError(err))
    },
    handleDeleteBtnClick: () => {
      popupCardDelete.editBtnText('Да')
      popupCardDelete.installFunctionSubmit(() => {
        popupCardDelete.editBtnText('Удаление...')
        api.deleteCard(dataCard._id)
          .then(() => card.deleteCard())
          .catch(err => displayError(err))
          .finally(() => popupCardDelete.close())
      })
      popupCardDelete.open()
    }
  })
  const cardElement = card.getCard()
  return cardElement
}

const displayError = error => {
  console.log(`Ошибка ${error}`)
}

btnEditAvatarProfile.addEventListener('click', () => {
  popupAvatarEdit.editBtnText('Сохранить')
  formEditAvatarValidator.resetErrors()
  formEditAvatarValidator.disableSubmitButton()
  popupAvatarEdit.open()
})

btnEditProfile.addEventListener('click', () => {
  popupEdit.editBtnText('Сохранить')
  const dataUser = userProfile.getUserInfo()
  popupEdit.setInputValues(dataUser)
  formEditProfileValidator.resetErrors()
  formEditProfileValidator.enableSubmitButton()
  popupEdit.open()
})

btnAddCard.addEventListener('click', () => {
  popupCardAdd.editBtnText('Создать')
  formAddCardValidator.resetErrors()
  formAddCardValidator.disableSubmitButton()
  popupCardAdd.open()
})

popupEdit.setEventListeners()
popupAvatarEdit.setEventListeners()
popupCardAdd.setEventListeners()
popupCardDelete.setEventListeners()
popupImage.setEventListeners()

formAddCardValidator.enableValidation()
formEditProfileValidator.enableValidation()
formEditAvatarValidator.enableValidation()

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([dataUser, dataCards]) => {
    currentUserId = dataUser._id
    userProfile.setUserAvatar(dataUser)
    userProfile.setUserInfo(dataUser)
    cardList.renderItems(dataCards)
  })
  .catch(err => displayError(err))


