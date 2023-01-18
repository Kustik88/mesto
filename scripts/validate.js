const showInputError = (popUpForm, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = popUpForm.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (popUpForm, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = popUpForm.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}
const checkInputValidity = (popUpForm, inputElement, errorClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(popUpForm, inputElement, inputElement.validationMessage, errorClasses);
  } else {
    hideInputError(popUpForm, inputElement, errorClasses);
  }
}

const setEventListeners = (popUpForm, { inputSelector, submitButtonSelector, inactiveButtonClass, ...errorClasses }) => {
  const formElements = defineFormElements(popUpForm, inputSelector, submitButtonSelector);
  formElements.inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popUpForm, inputElement, errorClasses);
      toggleButtonState(formElements.inputList, formElements.buttonElement, inactiveButtonClass);
    });
  });
}

const defineFormElements = (popUpForm, inputSelector, submitButtonSelector) => {
  const inputList = Array.from(popUpForm.querySelectorAll(inputSelector));
  const buttonElement = popUpForm.querySelector(submitButtonSelector);
  return { inputList, buttonElement }
}

const enableValidation = (({ formSelector, ...rest }) => {
  const popUpForm = Array.from(document.querySelectorAll(formSelector));
  popUpForm.forEach((popUpformElement) => {
    popUpformElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(popUpformElement, rest);
  });
})

const hasInvalidInput = (inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
})

const toggleButtonState = ((inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
})

function resetInputError(popUpForm) {
  const formElements = defineFormElements(popUpForm, validationSettings.inputSelector, validationSettings.submitButtonSelector);
  formElements.inputList.forEach((inputElement) => {
    hideInputError(popUpForm, inputElement, validationSettings);
  });
  toggleButtonState(formElements.inputList, formElements.buttonElement, validationSettings.inactiveButtonClass);
}

enableValidation(validationSettings);
