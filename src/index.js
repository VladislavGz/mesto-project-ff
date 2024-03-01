import './pages/index.css';
import { openPopup, closePopup } from './components/modal';
import { createCard, deleteCard, likeCard } from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import {
    getUser,
    patchUser,
    getCards,
    postCard,
    delCardRequest,
    putCardLike,
    delCardLike,
    patchAvatar
} from './components/api';

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
const popupUpdateAvatar = document.querySelector('.popup_type_edit-avatar');

const editForm = popupEdit.querySelector('.popup__form');
const editNameInput = editForm.elements['name'];
const editJobInput = editForm.elements['description'];

const addCardForm = popupAddCard.querySelector('.popup__form');
const addCardNameInput = addCardForm.elements['place-name'];
const addCardLinkInput = addCardForm.elements['link'];

const updateAvatarForm = popupUpdateAvatar.querySelector('.popup__form');
const updateAvatarLinkInput = updateAvatarForm.elements['link'];

//функция установки аватара на страницу
function setAvatar (url) {
    profileImg.setAttribute('style', `background-image: url("${url}")`);
}

//функция активации элемента ожидания загрузки
function enableWaitElem (popup) {
    popup.querySelector('.popup__button_loading-element').classList.add('popup__button_loading-element_active');
}

//функция отключения элемента ожидания загрузки
function disableWaitElem (popup) {
    popup.querySelector('.popup__button_loading-element').classList.remove('popup__button_loading-element_active');
}

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

    enableWaitElem(popupEdit);
    patchUser({
        name: editNameInput.value,
        about: editJobInput.value
    })
        .then(result => {
            setUserData(result.name, result.about);
            closePopup(popupEdit);
        })
        .catch(err => {
            console.log(err);
        });
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

    enableWaitElem(popupAddCard);
    postCard({
        name: addCardNameInput.value,
        link: addCardLinkInput.value
    })
        .then(result => {
            const newCard = {
                name: result.name,
                link: result.link,
                likes: result.likes.length,
                cardId: result._id,
                isOwner: true,
                isLike: false
            };

            const networkQueryFuncs = {
                delCard: delCardRequest,
                putLike: putCardLike,
                delLike: delCardLike
            };

            cardList.prepend(createCard(cardTemplate, newCard, deleteCard, likeCard, openImage, networkQueryFuncs));
            closePopup(popupAddCard);
        })
        .catch(err => {
            console.log(err);
        });
}

//функция открытия попапа обновления аватара
function openUpdateAvatar () {
    updateAvatarForm.reset();

    clearValidation(
        popupUpdateAvatar.querySelector('.popup__form'),
        {
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_error',
            errorClass: 'popup__input-error_active'
        }
    );

    openPopup(popupUpdateAvatar);
}

//обработчик отправки формы (обновление аватара)
function handleFormSubmitUpdateAvatar (evt) {
    evt.preventDefault();

    enableWaitElem(popupUpdateAvatar);
    patchAvatar({
        avatar: updateAvatarLinkInput.value
    })
        .then(result => {
            setAvatar(result.avatar);
            closePopup(popupUpdateAvatar);
        })
        .catch(err => {
            console.log(err);
        });
}

//--------------------------------------------------------------------
//анимирование попапов
popupEdit.classList.add('popup_is-animated');
popupAddCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');
popupUpdateAvatar.classList.add('popup_is-animated');

//открытие окна редактирования профиля
editButton.addEventListener('click', openEdit);

//отправка формы (окно редактирования)
editForm.addEventListener('submit', handleFormSubmitEdit);

//открытие окна добавления новой карточки
addCardButton.addEventListener('click', openNewCard);

//отправка формы (новая карточка)
addCardForm.addEventListener('submit', handleFormSubmitAddCard);

//открытие окна обновления аватара
profileImg.addEventListener('click', openUpdateAvatar);

//отправка формы (обновление аватара)
updateAvatarForm.addEventListener('submit', handleFormSubmitUpdateAvatar);

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
        setAvatar(result[0].avatar);
        setUserData(result[0].name, result[0].about);
        const userId = result[0]._id;

        result[1].forEach(card => {
            const cardId = card.owner._id;

            //проверка наличия лайка карточки от пользователя
            let isLike = false;
            for (let i = 0; i < card.likes.length; i++) {
                if (card.likes[i]._id === userId) {
                    isLike = true;
                    break;
                }
            }

            const dataCard = {
                name: card.name,
                link: card.link,
                likes: card.likes.length,
                cardId: card._id,
                isOwner: userId === cardId,     //true, если пользователь является создателем данной карточки
                isLike: isLike                  //true, если данная карточка лайкнута пользователем
            };

            const networkQueryFuncs = {
                delCard: delCardRequest,
                putLike: putCardLike,
                delLike: delCardLike
            };

            cardList.append(createCard(cardTemplate, dataCard, deleteCard, likeCard, openImage, networkQueryFuncs));
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