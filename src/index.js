import './pages/index.css';
import { openPopup, closePopup } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getUser, patchUser, getCards, postCard } from './components/api';

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

//функция изменения данных пользователя
function setUserData (name, about) {
    profileTitle.textContent = name;
    profileDescription.textContent = about;
}

//обработчик отправки формы (окно редактирования)
function handleFormSubmitEdit (evt) {
    evt.preventDefault();

    patchUser({
        name: editNameInput.value,
        about: editJobInput.value
    })
        .then(result => {
            setUserData(result.name, result.about);
        })
        .catch(err => {
            console.log(err);
        });

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

    postCard({
        name: addCardNameInput.value,
        link: addCardLinkInput.value
    })
        .then(result => {
            const newCard = {
                name: result.name,
                link: result.link,
                likes: result.likes.length
            };

            cardList.prepend(createCard(cardTemplate, newCard, deleteCard, likeCard, openImage));
        })
        .catch(err => {
            console.log(err);
        });

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
//обработка запросов
const userData = getUser();         //запрос данных о пользователе
const cardsData = getCards();       //запрос данных карточек

//обрабатываем результат только поле выполнения всех запросов
Promise.all([userData, cardsData])
    .then(result => {
        setUserData(result[0].name, result[0].about);
        
        result[1].forEach(dataObj => {
            const dataCard = {
                name: dataObj.name,
                link: dataObj.link,
                likes: dataObj.likes.length
            };
            cardList.append(createCard(cardTemplate, dataCard, deleteCard, likeCard, openImage));
        });
    })
    .catch(err => {
        console.log(err);
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