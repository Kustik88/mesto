import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'))
  }

  _getInputValues() {
    this._inputValues = {}
    this._inputList.forEach(inputItem => this._inputValues[inputItem.name] = inputItem.value)
  }

  insertProfileValuesToForm(data) {
    Object.keys(data).forEach(key => {
      this._inputList.forEach(inputItem => {
        if (key === inputItem.name) {
          inputItem.value = data[key]
        }
      })
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', () => {
      this._getInputValues()
      this._handleFormSubmit(this._inputValues)
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

}
