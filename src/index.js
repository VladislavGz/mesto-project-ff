import './pages/index.css';
import initialCards from './components/cards';
import { openPopup, closePopup } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getUser } from './components/api';

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

//DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImg = document.querySelector('.profile__image');

const cardList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const editForm = popupEdit.querySelector('.popup__form');
const editNameInput = editForm.elements['name'];
const editJobInput = editForm.elements['description'];

const addCardForm = popupAddCard.querySelector('.popup__form');
const addCardNameInput = addCardForm.elements['place-name'];
const addCardLinkInput = addCardForm.elements['link'];

//функция открытия изображения
function openImage (imgData) {
    const img = popupImage.querySelector('.popup__image');
    const txt = popupImage.querySelector('.popup__caption');

    img.setAttribute('src', imgData.src);
    img.setAttribute('alt', imgData.alt);
    txt.textContent = imgData.txt;

    openPopup(popupImage);
}

//функция открытия окна редактирования
function openEdit () {
    editNameInput.value = profileTitle.textContent;
    editJobInput.value = profileDescription.textContent;

    clearValidation(
        popupEdit.querySelector('.popup__form'),
        {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_error',
            errorClass: 'popup__input-error_active'
        }
    );

    openPopup(popupEdit);
}

//обработчик отправки формы (окно редактирования)
function handleFormSubmitEdit (evt) {
    evt.preventDefault();

    profileTitle.textContent = editNameInput.value;
    profileDescription.textContent = editJobInput.value;

    closePopup(popupEdit);
}

//функция открытия попапа добавления карточки
function openNewCard () {
    addCardForm.reset();

    clearValidation(
        popupAddCard.querySelector('.popup__form'),
        {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_error',
            errorClass: 'popup__input-error_active'
        }
    );

    openPopup(popupAddCard);
}

//обработчик отправки формы (новая карточка)
function handleFormSubmitAddCard (evt) {
    evt.preventDefault();

    const newCard = {
        name: addCardNameInput.value,
        link: addCardLinkInput.value
    };

    cardList.prepend(createCard(cardTemplate, newCard, deleteCard, likeCard, openImage));
    closePopup(popupAddCard);
}

//--------------------------------------------------------------------
//анимирование попапов
popupEdit.classList.add('popup_is-animated');
popupAddCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

//открытие окна редактирования профиля
editButton.addEventListener('click', openEdit);

//отправка формы (окно редактирования)
editForm.addEventListener('submit', handleFormSubmitEdit);

//открытие окна добавления новой карточки
addCardButton.addEventListener('click', openNewCard);

//отправка формы (новая карточка)
addCardForm.addEventListener('submit', handleFormSubmitAddCard);

//обработка клавиатуры
document.addEventListener('keydown', evt => {
    //открытие попапа добавления карточки
    if (evt.key === '+') {
        openNewCard();
        return;
    }
});

//--------------------------------------------------------------------
//загрузка и вставка на страницу данных пользователя
getUser()
    .then(user => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
    })
    .catch(err => {
        console.log(err);
    });

//Вывести карточки на страницу
initialCards.forEach(elem => {
    cardList.append(createCard(cardTemplate, elem, deleteCard, likeCard, openImage));
});

//включаем валидацию
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
});