//функция открытия попапа
function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', popupClickHandler);
    document.addEventListener('keydown', popupEscapeHandler);
}

//функция закрытия попапа
function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', popupClickHandler);
    document.removeEventListener('keydown', popupEscapeHandler);
    disableWaitElem(popup);
}

//функция обработки события клика по попапу
function popupClickHandler (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    }
}

//функция обработки события нажатия Escape
function popupEscapeHandler (evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

//функция активации элемента ожидания загрузки
function enableWaitElem (popup) {
    popup.querySelector('.popup__button_loading-element').classList.add('popup__button_loading-element_active');
}

//функция отключения элемента ожидания загрузки
function disableWaitElem (popup) {
    popup.querySelector('.popup__button_loading-element').classList.remove('popup__button_loading-element_active');
}

export {
    openPopup,
    closePopup,
    enableWaitElem
};

