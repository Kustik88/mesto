export default class formValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this.config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this.config.inputSelector));
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    this._serEventListeners()
  }

  _serEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
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
    inputElement.classList.add(this.config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this.config.errorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this.config.inputErrorClass)
    errorElement.classList.remove(this.config.errorClass)
    errorElement.textContent = ''
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton()
    } else {
      this._enableSubmitButton()
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  disableSubmitButton = () => {
    this._submitButton.setAttribute('disabled', true)
    this._submitButton.classList.add(this.config.inactiveButtonClass)
  }

  _enableSubmitButton = () => {
    this._submitButton.removeAttribute('disabled', true)
    this._submitButton.classList.remove(this.config.inactiveButtonClass)
  }
}

