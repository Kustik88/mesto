import './index.css'
import Api from '../components/Api.js'
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import {
  validationSettings,
  btnEditProfile,
  btnAddCard,
  formEdit,
  formAdd,
} from "../utils/constants.js"

let currentUserId

const api = new Api(
  'https://nomoreparties.co/v1/cohort-61',
  '691fb0ad-da89-4356-9015-af40e9b402a2'
)

const userProfile = new UserInfo('.profile__owner', '.profile__job', '.profile__avatar')
const formEditValidator = new FormValidator(validationSettings, formEdit)
const formAddValidator = new FormValidator(validationSettings, formAdd)

const cardList = new Section({
  renderer: dataCard => {
    cardList.addItem(createCard(dataCard))
  }
}, '.cards')

const popupCardAdd = new PopupWithForm({
  handleFormSubmit: data => {
    api.addCard(data)
      .then(res => {
        cardList.addItem(createCard(res), true)
      })
      .catch(err => displayError(err))
      .finally(() => {
        popupCardAdd.close()
      })
  }
}, '.popup_type_add-card')

const popupCardDelete = new PopupWithSubmit({
  handleFormSubmit: () => {
    popupCardDelete.executeSubmit()
  }
}, '.popup_type_delete-card')

const popupEdit = new PopupWithForm({
  handleFormSubmit: data => {
    api.changeUserInfo(data)
      .then(res => {
        userProfile.setUserInfo({
          name: res.name,
          about: res.about
        })
      })
      .catch(err => displayError(err))
      .finally(() => {
        popupEdit.close()
      })
  }
}, '.popup_type_profile-edit')

const popupImage = new PopupWithImage('.popup_type_image')

const createCard = dataCard => {
  const card = new Card(dataCard, '#card', currentUserId, {
    handleCardClick: () => {
      popupImage.open(dataCard)
    },

    handleLikeClick: isLiked => {
      if (isLiked) {
        api.unlikeCard(dataCard._id)
          .then(res => card.countLikes(res.likes.length))
          .catch(err => displayError(err))
      } else {
        api.likeCard(dataCard._id)
          .then(res => card.countLikes(res.likes.length))
          .catch(err => displayError(err))
      }
    },
    handleDeleteBtnClick: () => {
      popupCardDelete.open()
      popupCardDelete.installFunctionSubmit(() => {
        api.deleteCard(dataCard._id)
        .then(() => card.deleteCard())
        .catch(err => displayError(err))
        .finally(() => {
          popupCardDelete.close()
        })
      })
    }
  })
  const cardElement = card.getCard()
  return cardElement
}

const displayError = error => {
  console.log(`Ошибка ${error}`)
}

btnEditProfile.addEventListener('click', () => {
  const dataUser = userProfile.getUserInfo()
  popupEdit.setInputValues(dataUser)
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
popupCardDelete.setEventListeners()
popupImage.setEventListeners()

formAddValidator.enableValidation()
formEditValidator.enableValidation()

Promise.all([api.getCurrentUser(), api.getCards()])
  .then(([dataUser, dataCards]) => {
    currentUserId = dataUser._id
    userProfile.setUserAvatar(dataUser)
    userProfile.setUserInfo(dataUser)
    cardList.renderItems(dataCards)
    console.log(dataCards)
  })
  .catch(err => displayError(err))


