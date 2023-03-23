import './index.css'
import Sorter from '../components/Sorter.js'
import Api from '../components/Api.js'
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import ButtonDropdown from '../components/ButtonDropdown.js'
import {
  validationSettings,
  btnEditAvatarProfile,
  btnEditProfile,
  btnAddCard,
  formEditProfile,
  formAddCard,
  formEditAvatarProfile,
  btnSortLikesAscending,
  btnSortLikesDescending,
} from "../utils/constants.js"

let currentUserId
let dataCards
let listUniqueOwnersId

const api = new Api(
  'https://nomoreparties.co/v1/cohort-61',
  '691fb0ad-da89-4356-9015-af40e9b402a2'
)

const userProfile = new UserInfo('.profile__owner', '.profile__job', '.profile__avatar')
const filterLikesCard = new Sorter('likes')
const filterOwnersCard = new Sorter('owner')
const formEditProfileValidator = new FormValidator(validationSettings, formEditProfile)
const formAddCardValidator = new FormValidator(validationSettings, formAddCard)
const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatarProfile)

const cardList = new Section({
  renderer: dataCard => cardList.addItem(createCard(dataCard))
}, '.cards')

const sorterOwnerCards = new Section({
  renderer: data => {
    sorterOwnerCards.changeContainer('filters__dropdown-container')
    sorterOwnerCards.addItem(createBtnDropdown(data))
  }
}, '.type_owner-filter')

const popupCardAdd = new PopupWithForm({
  handleFormSubmit: data => {
    popupCardAdd.editBtnText('Сохранение...')
    api.addCard(data)
      .then(res => {
        if(!listUniqueOwnersId.some(item => item === res.owner._id)) {
          sorterOwnerCards.addItem(createBtnDropdown(res.owner), true)
        }

        cardList.addItem(createCard(res), true),
        popupCardAdd.close()
      })
      .catch(err => displayError(err))
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
        }),
        popupEdit.close()
      })
      .catch(err => displayError(err))
  }
}, '.popup_type_profile-edit')

const popupAvatarEdit = new PopupWithForm({
  handleFormSubmit: data => {
    popupAvatarEdit.editBtnText('Сохранение...')
    api.editAvatarProfile(data.avatar)
      .then(res => {
        userProfile.setUserAvatar(res),
        popupAvatarEdit.close()
      })
      .catch(err => displayError(err))
  }
}, '.popup_type_avatar-edit')

const popupImage = new PopupWithImage('.popup_type_image')

const createBtnDropdown = dataOwner => {
    const btn = new ButtonDropdown(dataOwner, '#btn-dropdown', {
      handleButtonClick: () => {
        const listCardsOwner = dataCards.filter(card => {
          if(dataOwner._id === card.owner._id) {
            return card
          }
        })
        cardList.clearBlock()
        cardList.renderItems(listCardsOwner)
      }
    })
    const btnDrop = btn.getButton()
    return btnDrop

    // const btnDropdown = parent.querySelector(`#btn-dropdown_type_${dataOwner._id}`)
    // return btnDropdown
}

const createCard = dataCard => {
  const card = new Card(dataCard, '#card', currentUserId, {
    handleCardClick: () => popupImage.open(dataCard),
    handleLikeClick: isLiked => {
      (isLiked
        ? api.unlikeCard(dataCard._id)
        : api.likeCard(dataCard._id))
        .then(res => {
          card.countLikes(res.likes.length),
          card.toggleLikeBtn()
        })
        .catch(err => displayError(err))
    },
    handleDeleteBtnClick: () => {
      popupCardDelete.installFunctionSubmit(() => {
        api.deleteCard(dataCard._id)
          .then(() => {
            card.deleteCard(),
            popupCardDelete.close()
          })
          .catch(err => displayError(err))
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

const sortList = ascendig => {
  api.getCards()
  .then(data => {
    cardList.clearBlock()
    cardList.renderItems(filterLikesCard.sortingAscendingDescending(data, ascendig), currentUserId)
  })
  .catch(err => console.log(err))
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

btnSortLikesAscending.addEventListener('click', () => {
  sortList(true)
})

btnSortLikesDescending.addEventListener('click', () => {
  sortList()
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
  .then(([dataUser, data]) => {
    currentUserId = dataUser._id
    dataCards = data
    userProfile.setUserAvatar(dataUser)
    userProfile.setUserInfo(dataUser)
    cardList.renderItems(dataCards)
    const listUniqueOwners = sorterOwnerCards.getUniqueOwnersCard(dataCards)
    listUniqueOwnersId = listUniqueOwners.map(item => item._id)
    sorterOwnerCards.renderItems(listUniqueOwners)
  })
  .catch(err => displayError(err))
