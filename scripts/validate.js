const showInputError = (object, popUpForm, inputElement, errorMessage) => {
  const errorElement = popUpForm.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (object, popUpForm, inputElement) => {
  const errorElement = popUpForm.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (object, popUpForm, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(object, popUpForm, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(object, popUpForm, inputElement);
  }
};

const setEventListeners = (object, popUpForm) => {
  const inputList = Array.from(popUpForm.querySelectorAll(object.inputSelector));
  const buttonElement = popUpForm.querySelector(object.submitButtonSelector);
  toggleButtonState(object, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(object, popUpForm, inputElement);
      toggleButtonState(object, inputList, buttonElement);
    });
  });
};

const enableValidation = ((object) => {
  const popUpForm = Array.from(document.querySelectorAll(object.formSelector));
  popUpForm.forEach((popUpformElement) => {
    popUpformElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(object, popUpformElement);
  });
});


const hasInvalidInput = (inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
});

const toggleButtonState = ((object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(object.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
});
