import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selectorPopup) {
    super(selectorPopup)
    this._popupForm = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault()
      this._handleFormSubmit()
    })
  }

  executeSubmit(func) {
    this._executorSubmit(func)
  }


  installFunctionSubmit(func) {
   this._executorSubmit = func

  }

  transferData(data) {
  this._data = data
  }
}
