export default class FormValidator {
  constructor(config, formElement) {
    this.config = config
    this._formElement = formElement
    this._submitButton = this._formElement.querySelector(this.config.selectorSubmitButton)
    this._inputList = Array.from(this._formElement.querySelectorAll(this.config.selectorInput))
  }

  enableValidation() {
    this._setEventListeners()
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this.config.classInputError)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this.config.classError)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this.config.classInputError)
    errorElement.classList.remove(this.config.classError)
    errorElement.textContent = ''
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton()
    } else {
      this.enableSubmitButton()
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  disableSubmitButton = () => {
    this._submitButton.setAttribute('disabled', true)
    this._submitButton.classList.add(this.config.classInactiveButton)
  }

  enableSubmitButton = () => {
    this._submitButton.removeAttribute('disabled', true)
    this._submitButton.classList.remove(this.config.classInactiveButton)
  }

  resetErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    })
  }
}
