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
}

//функция обработки события клика по попапу
function popupClickHandler (evt) {
    const popup = evt.target.closest('.popup');
    const closeBtn = popup.querySelector('.popup__close');

    if (evt.target === popup || evt.target === closeBtn) {
        closePopup(popup);
    }
}

//функция обработки события нажатия Escape
function popupEscapeHandler (evt) {
    
}

export {
    openPopup,
    closePopup
};

