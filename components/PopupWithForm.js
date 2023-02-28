import { validationSettings } from "./constants"
import Card from "./Card"

export default class PopupWithForm extends Popup {
  consnructor(handleFormSubmit, popupSelector) {
    super(popupSelector)
    this._popup = super._popup
    this._popupForm = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
    this._submitButton = this._popup.querySelector(validationSettings.submitButtonSelector)
    this._inputList = Array.from(this._popup.querySelector(validationSettings.inputSelector))
  }

  _getInputValues() {
    this._inputValues = []
    this._inputList.forEach(inputItem => {
      const dataInput = {}
      dataInput.name = inputItem.name
      dataInput.value = inputItem.value
      this._inputValues.push(dataInput)
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this._submitButton.addEventListener('submit', this._handleFormSubmit)
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

}
