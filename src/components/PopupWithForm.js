import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector)
    this._popupForm = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'))
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

  close() {
    super.close()
    this._popupForm.reset()
  }
}
