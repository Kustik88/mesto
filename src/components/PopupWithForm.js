import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selectorPopup) {
    super(selectorPopup)
    this._popupForm = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
    this._inputList = this._popupForm.querySelectorAll('.popup__input')
    this._btnSubmit = this._popupForm.querySelector('.popup__submit-btn')
  }

  _getInputValues() {
    this._inputValues = {}
    this._inputList.forEach(inputItem => this._inputValues[inputItem.name] = inputItem.value)
    return this._inputValues

  }

  setInputValues(data) {
    this._inputList.forEach(inputItem => inputItem.value = data[inputItem.name])
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', evt => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  editBtnText(text) {
    this._btnSubmit.textContent = text
  }

  close() {
    super.close()
    this._popupForm.reset()
  }
}
