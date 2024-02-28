//функция активирует показ сообщения об ошибке и меняет стиль поля ввода
function showInputError (formElement, inputElement, errorMsg, classOptions) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(classOptions.inputErrorClass);
    errorElement.textContent = errorMsg;
    errorElement.classList.add(classOptions.errorClass);
}

//функция скрывает сообщение об ошибке и сбрасывает стиль поля ввода
function hideInputError (formElement, inputElement, classOptions) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(classOptions.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(classOptions.errorClass);
}

//проверка содержимого поля ввода на валидность
function isValid (formElement, inputElement, classOptions) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, classOptions);
    } else {
        let errorMsg = inputElement.validationMessage;
        if (inputElement.validity.patternMismatch) {
            errorMsg = inputElement.getAttribute('data-pattern-err-msg');
        }
        showInputError(formElement, inputElement, errorMsg, classOptions);
    }
}

//функция возвращает true если все поля формы валидны
function checkValidity (inputList) {
    return inputList.every(input => {
        return input.validity.valid;
    });
}

//функция проверяет все поля на валидность и меняет стили кнопки
function toggleButtonState (submitButton, classOptions, inputList) {
    if (checkValidity(inputList)) {
        submitButton.disabled = false;
        submitButton.classList.remove(classOptions.inactiveButtonClass);
    } else {
        submitButton.disabled = true;
        submitButton.classList.add(classOptions.inactiveButtonClass);
    }
}

//функция первоначальной проверки валидности всех форм
function initCheckValidity (formElement, submitButton, inputList, classOptions) {
    inputList.forEach(inputElement => {
        isValid(formElement, inputElement, classOptions);
    });

    toggleButtonState(submitButton, classOptions, inputList);
}


function enableValidation (options) {
    const classOptions = {
        inactiveButtonClass: options.inactiveButtonClass,
        inputErrorClass: options.inputErrorClass,
        errorClass: options.errorClass
    };

    const forms = Array.from(document.querySelectorAll(options.formSelector));

    forms.forEach(formElement => {
        const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector(options.submitButtonSelector);

        initCheckValidity (formElement, submitButton, inputList, classOptions);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement, classOptions);
                toggleButtonState(submitButton, classOptions, inputList);
            });
        });
    });
}

export {
    enableValidation
};