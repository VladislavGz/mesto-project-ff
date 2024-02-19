//функция открытия попапа
function openPopup (popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', popupHandler);
}

//функция закрытия попапа
function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', popupHandler);
}

//функция обработки события клика по попапу
function popupHandler (evt) {
    const popup = evt.target.closest('.popup');
    const closeBtn = popup.querySelector('.popup__close');

    if (evt.target === popup || evt.target === closeBtn) {
        closePopup(popup);
    }
}

export {
    openPopup,
    closePopup
};

