//функция активирует показ сообщения об ошибке и меняет стиль поля ввода
function showInputError (formElement, inputElement, errorMsg, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMsg;
    errorElement.classList.add(options.errorClass);
}

//функция скрывает сообщение об ошибке и сбрасывает стиль поля ввода
function hideInputError (formElement, inputElement, options) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(options.errorClass);
}

//проверка содержимого поля ввода на валидность
function isValid (formElement, inputElement, options) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, options);
    } else {
        let errorMsg = inputElement.validationMessage;
        if (inputElement.validity.patternMismatch) {
            errorMsg = inputElement.getAttribute('data-pattern-err-msg');
        }
        showInputError(formElement, inputElement, errorMsg, options);
    }
}

//функция возвращает true если все поля формы валидны
function checkValidity (inputList) {
    return inputList.every(input => {
        return input.validity.valid;
    });
}

//функция делает кнопку сабмита активной
function enableSubmitButton (submitButton, options) {
    submitButton.disabled = false;
    submitButton.classList.remove(options.inactiveButtonClass);
}

//функция делает кнопку сабмита неактивной
function disableSubmitButton (submitButton, options) {
    submitButton.disabled = true;
    submitButton.classList.add(options.inactiveButtonClass);
}

//функция проверяет все поля на валидность и меняет стили кнопки
function toggleButtonState (submitButton, options, inputList) {
    if (checkValidity(inputList)) {
        enableSubmitButton (submitButton, options);
    } else {
        disableSubmitButton(submitButton, options);
    }
}

//функция первоначальной проверки валидности всех форм
function initCheckValidity (formElement, submitButton, inputList, options) {
    inputList.forEach(inputElement => {
        isValid(formElement, inputElement, options);
    });

    toggleButtonState(submitButton, options, inputList);
}

//функция активации валидации
function enableValidation (options) {
    const forms = Array.from(document.querySelectorAll(options.formSelector));

    forms.forEach(formElement => {
        const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector(options.submitButtonSelector);

        //initCheckValidity (formElement, submitButton, inputList, options);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement, options);
                toggleButtonState(submitButton, options, inputList);
            });
        });
    });
}

//очищает ошибки валидации формы и делает кнопку неактивной
function clearValidation (formElement, options) {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const submitButton = formElement.querySelector(options.submitButtonSelector); 

    inputList.forEach(inputElement => {
        hideInputError (formElement, inputElement, options)
    })

    disableSubmitButton (submitButton, options);
}

export {
    enableValidation,
    clearValidation
};