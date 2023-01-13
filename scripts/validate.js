const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, buttonElement, InputConteiner) => {
  const inputList = Array.from(InputConteiner.querySelectorAll('.popup__input'));
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });

  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const buttonElement = formElement.querySelector('.popup__submit-btn');
    const inputConteinerList = Array.from(formElement.querySelectorAll('.popup__input-container'));
    inputConteinerList.forEach((InputConteiner) => {
      setEventListeners(formElement, buttonElement, InputConteiner);
    });
  });
};

const hasInvalidInput = (inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
});

const toggleButtonState = ((inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-btn_inactive');
  } else {
    buttonElement.classList.remove('popup__submit-btn_inactive');
  }
});

enableValidation();
